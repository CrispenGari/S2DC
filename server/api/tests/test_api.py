class TestAPI:
    def test_meta(self):
        from api.app import app

        client = app.test_client()
        res = client.get("/")
        assert res.json == {
            "description": "This is a simple AI classification deep learning API that will accurately identify the disease based on the description of the symptoms, from text.",
            "language": "python",
            "libraries": ["pytorch", "torchtext"],
            "main": "Symptoms to Disease Classification (S2DC) API.",
            "programmer": "@crispengari",
        }
        assert res.status_code == 200

    def test_diagnose(self):
        from api.app import app

        client = app.test_client()
        res = client.post(
            "/api/v1/diagnose",
            json={
                "symptoms": "i've recently been suffering with chills, lethargy, a cough, a high temperature, and difficulties breathing."
            },
        )

        assert "prediction" in res.json
        assert "success" in res.json
        assert "time" in res.json
        assert res.json["success"]
        assert res.status_code == 200
