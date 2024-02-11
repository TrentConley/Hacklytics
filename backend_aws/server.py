from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import uuid 
import time

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

models = {}
modelQueue = []
jobs = {}
jobQueue = []

@app.route("/debug")
def debug():
    print(models)
    print(modelQueue)
    print(jobs)
    print(jobQueue)
    return "", 200

@app.route("/upload/<modelName>", methods=["POST"])
def upload(modelName):
    print('recieved input')
    modelID = str(uuid.uuid1())
    models[modelID] = [modelName, 0]
    data = request.json
    modelQueue.append({"id": modelID, "data":data})
    return "", 201

@app.route("/checkModels", methods=["GET"])
def checkModels():
    if (len(modelQueue) == 0):
        return "", 204
    return jsonify(modelQueue.pop()), 200

@app.route("/finishModel", methods=["POST"])
def finishModels():
    data = request.json
    if (data["id"] == "refused"):
        return "", 400
    if (data["id"] in models):
        models[data["id"]][1] = 1
        return "", 202
    else:
        return "", 400

@app.route("/getModels", methods=["GET"])
def getModels():
    items = [(a, b) for a, (b, c) in list(models.items())]
    return jsonify(items), 200

@app.route("/classify", methods=["POST"])
def classify():
    jobID = str(uuid.uuid1())
    jobs[jobID] = 0
    data = request.json
    jobQueue.append({"id": jobID, "data":data})
    while (jobs[jobID] == 0):
      time.sleep(0.1)
    return jsonify(jobs[jobID]), 200

@app.route("/checkJobs", methods=["GET"])
def checkJobs():
    if (len(jobQueue) == 0):
        return "", 204
    return jsonify(jobQueue.pop()), 200

@app.route("/finishJob", methods=["POST"])
def finishJob():
    data = request.json
    if (data["id"] in jobs):
        models[data["id"]] = data
        return "", 202
    else:
        return "", 400

if __name__ == '__main__':
    
    app.run(host= '0.0.0.0',debug=True)