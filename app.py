from flask import Flask, render_template, request, redirect, url_for, jsonify
import csv

app = Flask(__name__)

# ---------------- LOGIN ---------------- #

@app.route("/")
def login():
    return render_template("login.html")


@app.route("/login", methods=["POST"])
def user_login():
    username = request.form.get("username")
    password = request.form.get("password")

    if username and password:
        return redirect(url_for("home"))
    else:
        return render_template("login.html", error="Enter Username and Password")


# ---------------- HOME ---------------- #

@app.route("/home")
def home():
    return render_template("index.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route("/story")
def story():
    return render_template("story.html")


@app.route("/brands")
def brands():
    return render_template("brands.html")


# ---------------- RECOMMENDATION ---------------- #

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json()
        print("Received:", data)

        if data is None:
            return jsonify({"error": "No JSON data received"}), 400

        skin = data.get("skinType", "").lower()
        print("Selected skin:", skin)

        column = {
            "dry": "Dry",
            "oily": "Oily",
            "normal": "Normal",
            "combination": "Combination",
            "sensitive": "Sensitive"
        }

        if skin not in column:
            return jsonify([])

        recommendations = []

        with open("cosmetics.csv", newline="", encoding="utf-8") as file:

            reader = csv.DictReader(file)

            for row in reader:

                value = row.get(column[skin], "").strip().lower()

                if value in ["1", "true", "yes"]:

                    recommendations.append(row)

        recommendations.sort(
            key=lambda x: float(x.get("Rank", 0)),
            reverse=True
        )

        result = []

        for row in recommendations[:5]:

            result.append({

                "name": row.get("Name", ""),

                "brand": row.get("Brand", ""),

                "category": row.get("Label", ""),

                "price": row.get("Price", ""),

                "rating": row.get("Rank", "")

            })

        return jsonify(result)

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500


# ---------------- RUN ---------------- #

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)