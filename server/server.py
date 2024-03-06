from api.app import app


class AppConfig:
    PORT = 3001
    DEBUG = False


if __name__ == "__main__":
    app.run(
        debug=AppConfig().DEBUG,
        port=AppConfig().PORT,
    )
