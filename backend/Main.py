# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text2text-generation", model="facebook/blenderbot-400M-distill")

response = "How is your day going?"
result = pipe(response)
print(result)
