import os
import cv2
import numpy as np
import tensorflow as tf
from fastapi.responses import JSONResponse
import shutil
import mediapipe as mp

UPLOAD_FOLDER = 'image_dataset'
MODEL_PATH = 'app/models/Modelo.keras'
PESOS_PATH = 'app/models/pesos.weights.h5'

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

def load_model():
    model = tf.keras.models.load_model(MODEL_PATH)
    model.load_weights(PESOS_PATH)
    return model

def extract_hand_features(image):
    if image is None:
        return None
    with mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5) as hands:
        results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        if results.multi_hand_landmarks:
            hand_landmarks = results.multi_hand_landmarks[0]
            height, width, _ = image.shape
            x_min = int(min([lm.x for lm in hand_landmarks.landmark]) * width) - 40
            y_min = int(min([lm.y for lm in hand_landmarks.landmark]) * height) - 40
            x_max = int(max([lm.x for lm in hand_landmarks.landmark]) * width) + 40
            y_max = int(max([lm.y for lm in hand_landmarks.landmark]) * height) + 40
            x_min = max(x_min, 0)
            y_min = max(y_min, 0)
            x_max = min(x_max, width)
            y_max = min(y_max, height)
            hand_image = image[y_min:y_max, x_min:x_max]
            hand_image = cv2.resize(hand_image, (224, 224))
            return hand_image / 255.0
    return None

def load_image(file_path):
    image = cv2.imread(file_path)
    if image is None:
        raise ValueError(f"Image at {file_path} could not be loaded.")
    hand_image = extract_hand_features(image)
    if hand_image is not None:
        return hand_image.reshape(1, 224, 224, 3)
    return None

def predict_image(file):
    try:
        # Guardar imagen temporalmente
        temp_path = os.path.join(UPLOAD_FOLDER, 'temp.jpg')
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Verificar que el archivo se ha guardado correctamente
        if not os.path.exists(temp_path):
            raise ValueError(f"Temp file at {temp_path} could not be saved.")

        # Cargar modelo y la imagen de entrada
        model = load_model()
        print("Model loaded successfully")

        input_image = load_image(temp_path)
        if input_image is None:
            raise ValueError("No hand landmarks detected in the image")
        print("Image features extracted successfully")

        prediction = model.predict(input_image)
        print(f"Prediction: {prediction}")

        # Cargar las etiquetas desde las carpetas
        labels = [label for label in os.listdir(UPLOAD_FOLDER) if os.path.isdir(os.path.join(UPLOAD_FOLDER, label))]
        label_map = {idx: label for idx, label in enumerate(labels)}
        print(f"Label map: {label_map}")

        label_index = np.argmax(prediction)
        best_match = label_map.get(label_index, "Unknown")
        
        return {"letter_or_word": best_match}

    except ValueError as ve:
        print(f"ValueError: {str(ve)}")
        return JSONResponse(status_code=400, content={"error": str(ve)})
    except Exception as e:
        print(f"Error: {str(e)}")
        return JSONResponse(status_code=500, content={"error": str(e)})
