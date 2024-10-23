# Use a pipeline as a high-level helper
from transformers import pipeline
from flask import Flask, request, jsonify

app = Flask(__name__)
pipe = pipeline("text2text-generation", model="facebook/blenderbot-400M-distill")

@app.route('/process-input', methods=['POSTS'])
def process_input():
    data = request.json() # Get the JSON from React front end
    userinput = data.get("inputValue")
    response = pipe(userinput)

    result = f"Processed input: {response}"
    return jsonify(result)



if __name__ == '__main__':
    app.run(debug=True)





