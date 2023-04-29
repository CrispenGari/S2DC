
class Prediction:
    def __init__(self, pattern: str, disease: str, diseaseId: int, confidence: float):
        self.pattern = pattern
        self.disease = disease
        self.diseaseId = diseaseId
        self.confidence = confidence

    def __repr__(self) -> str:
        return f"<S2DC Prediction: {self.disease}>"

    def __str__(self) -> str:
        return f"<S2DC Prediction: {self.disease}>"

    def to_json(self):
        return {
            'pattern':  self.pattern,
            'disease':  self.disease,
            'diseaseId':  self.diseaseId,
            'confidence':  self.confidence,
        }
