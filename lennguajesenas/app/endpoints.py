from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import JSONResponse
import os
import shutil
import cv2
import numpy as np
import mediapipe as mp
from app.services.train_service import train_model
from app.services.predict_service import predict_image

router = APIRouter()

UPLOAD_FOLDER = 'image_dataset'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

def extract_hand_and_draw(image):
    with mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5) as hands:
        results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                x_min = min([lm.x for lm in hand_landmarks.landmark])
                y_min = min([lm.y for lm in hand_landmarks.landmark])
                x_max = max([lm.x for lm in hand_landmarks.landmark])
                y_max = max([lm.y for lm in hand_landmarks.landmark])
                height, width, _ = image.shape
                x_min = max(int(x_min * width) - 40, 0)
                y_min = max(int(y_min * height) - 40, 0)
                x_max = min(int(x_max * width) + 40, width)
                y_max = min(int(y_max * height) + 40, height)
                hand_image = image[y_min:y_max, x_min:x_max]
                return cv2.resize(hand_image, (224, 224))
    return None

def process_video(file_path, output_folder, label):
    cap = cv2.VideoCapture(file_path)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frames_to_extract = min(frame_count, 300)
    frame_indices = np.linspace(0, frame_count - 1, frames_to_extract, dtype=int)

    count = len([entry for entry in os.listdir(output_folder) if os.path.isfile(os.path.join(output_folder, entry))])
    for idx in frame_indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if not ret:
            continue
        hand_image = extract_hand_and_draw(frame)
        if hand_image is not None:
            count += 1
            file_path = os.path.join(output_folder, f"{label}{count}.jpg")
            cv2.imwrite(file_path, hand_image)
    cap.release()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), name: str = Form(...)):
    try:
        label_folder = os.path.join(UPLOAD_FOLDER, name)
        if not os.path.exists(label_folder):
            os.makedirs(label_folder)
        
        temp_file_path = os.path.join(label_folder, f"temp_{name}.mp4")
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        process_video(temp_file_path, label_folder, name)
        os.remove(temp_file_path)
        return {"message": f"Video processed and frames saved successfully to label {name}"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@router.post("/train")
async def train():
    return train_model()

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    return predict_image(file)
