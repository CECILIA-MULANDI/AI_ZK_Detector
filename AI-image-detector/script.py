from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch
from transformers import AutoModelForImageClassification, AutoImageProcessor
import hashlib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_name = "umm-maybe/AI-image-detector"
processor = AutoImageProcessor.from_pretrained(model_name, use_fast=True)
model = AutoModelForImageClassification.from_pretrained(model_name, use_safetensors=True)

@app.post("/api/classify")
async def classify_image(file: UploadFile = File(...)):
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data)).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")

    image_hash = hashlib.sha256(image.tobytes()).hexdigest()
    byte_array = [int(image_hash[i:i+2], 16) for i in range(0, len(image_hash), 2)]

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=-1)

    artificial_prob = probs[0][1].item()
    human_prob = probs[0][0].item()
    predicted_class = 1 if artificial_prob > human_prob else 0

    return {
        "artificial_prob": artificial_prob,
        "human_prob": human_prob,
        "predicted_class": predicted_class,
        "image_hash": byte_array
    }
