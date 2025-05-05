# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("image-classification", model="umm-maybe/AI-image-detector")
result = pipe("path/to/image.jpg")
print(result) 