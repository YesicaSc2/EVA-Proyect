import os
import random
import shutil
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from fastapi.responses import JSONResponse
from app.models.model import create_model

# Configuración global
UPLOAD_FOLDER = 'image_dataset'
VALIDATION_FOLDER = 'validation_dataset'
MODEL_PATH = 'app/models/Modelo.keras'
PESOS_PATH = 'app/models/pesos.weights.h5'
ALTURA, LONGITUD = 200, 200
BATCH_SIZE = 32
ITERACIONES = 50
PATIENCE = 5

def split_dataset(train_folder, validation_folder, split_ratio=0.2):
    if not os.path.exists(validation_folder):
        os.makedirs(validation_folder)
    
    for class_folder in os.listdir(train_folder):
        full_class_path = os.path.join(train_folder, class_folder)
        validation_class_path = os.path.join(validation_folder, class_folder)
        
        if os.path.isdir(full_class_path):
            if not os.path.exists(validation_class_path):
                os.makedirs(validation_class_path)
                images = os.listdir(full_class_path)
                num_images = len(images)
                num_validation_images = int(num_images * split_ratio)
                validation_images = random.sample(images, num_validation_images)
                
                for image in validation_images:
                    src_path = os.path.join(full_class_path, image)
                    dst_path = os.path.join(validation_class_path, image)
                    shutil.move(src_path, dst_path)

def train_model():
    try:
        # Dividir el conjunto de datos en entrenamiento y validación
        split_dataset(UPLOAD_FOLDER, VALIDATION_FOLDER, split_ratio=0.2)
        
        datos_entrenamiento = UPLOAD_FOLDER

        # Preprocesamiento de las imágenes
        preprocesamiento_entre = ImageDataGenerator(
            rescale=1./255,
            shear_range=0.2,
            zoom_range=0.2,
            horizontal_flip=True,
            rotation_range=20,
            width_shift_range=0.2,
            height_shift_range=0.2,
            fill_mode='nearest'
        )

        preprocesamiento_val = ImageDataGenerator(
            rescale=1./255
        )

        imagen_entreno = preprocesamiento_entre.flow_from_directory(
            datos_entrenamiento,
            target_size=(ALTURA, LONGITUD),
            batch_size=BATCH_SIZE,
            class_mode='categorical'
        )

        imagen_validacion = preprocesamiento_val.flow_from_directory(
            VALIDATION_FOLDER,
            target_size=(ALTURA, LONGITUD),
            batch_size=BATCH_SIZE,
            class_mode='categorical'
        )

        # Determinar dinámicamente el número de clases
        num_classes = len(imagen_entreno.class_indices)

        # Ajustar dinámicamente los steps_per_epoch y validation_steps
        steps_per_epoch = imagen_entreno.samples // BATCH_SIZE
        validation_steps = imagen_validacion.samples // BATCH_SIZE

        model = create_model((ALTURA, LONGITUD, 3), num_classes)

        # Callbacks para detener el entrenamiento temprano y guardar el mejor modelo
        early_stopping = EarlyStopping(monitor='val_loss', patience=PATIENCE, restore_best_weights=True)
        model_checkpoint = ModelCheckpoint(MODEL_PATH, save_best_only=True, monitor='val_loss')

        model.fit(
            imagen_entreno,
            steps_per_epoch=steps_per_epoch,
            epochs=ITERACIONES,
            validation_data=imagen_validacion,
            validation_steps=validation_steps,
            callbacks=[early_stopping, model_checkpoint]
        )

        model.save_weights(PESOS_PATH)
        print("Model trained and saved successfully")

        return {"message": "Model trained successfully"}

    except Exception as e:
        print(f"Error: {str(e)}")
        return JSONResponse(status_code=500, content={"error": str(e)})
