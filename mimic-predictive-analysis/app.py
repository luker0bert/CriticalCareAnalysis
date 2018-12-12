#################################################
# Database Setup
#################################################
import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from initdb import create_db, engine

#################################################
# Initialize Flask
#################################################

app = Flask(__name__)

#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///db/mimic.db")

#reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to each table
labs = Base.classes.labsNew
survived = Base.classes.survived
died = Base.classes.died

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/teampage")
def teampage():
    """Return the teampage."""
    return render_template("teampage.html")

# @app.route("/data/labs")
# def data():
#     session = Session(engine)
#     results = session.query(labs).all()

#     all_data = []
#     for labs in results:
#         labs_dict = {}
    #     labs_dict["SUBJECT_ID"] = labs.SUBJECT_ID
    #     labs_dict["HADM_ID"] = labs.HADM_ID
    #     labs_dict["Albumin"] = labs.Albumin
    #     labs_dict["Anion Gap"] = labs.Anion Gap
    #     labs_dict["Bicarbonate"] = labs.Bicarbonate
    #     labs_dict["Bilirubin, Total"] = labs.['Bilirubin, Total']
    #     labs_dict["Chloride"] = labs.Chloride
    #     labs_dict["Chloride, Whole Blood"] = labs.Chloride, Whole Blood
    #     labs_dict["Creatinine"] = labs.Creatinine
    #     labs_dict["Glucose_Blood_Gas"] = labs.Glucose_Blood_Gas
    #     labs_dict["Glucose_Chemistry"] = labs.Glucose_Chemistry
    #     labs_dict["Hematocrit"] = labs.Hematocrit
    #     labs_dict["Hematocrit, Calculated"] = labs.Hematocrit, Calculated
    #     labs_dict["Hemoglobin_Blood_Gas"] = labs.
    #     labs_dict["Hemoglobin_Hematology"] = labs.
    #     labs_dict["INR(PT)"] = labs.
    #     labs_dict["Lactate"] = labs.
    #     labs_dict["Magnesium"] = labs.
    #     labs_dict["PT"] = labs.
    #     labs_dict["PTT"] = labs.
    #     labs_dict["Phosphate"] = labs.
    #     labs_dict["Platelet Count"] = labs.
    #     labs_dict["Potassium"] = labs.
    #     labs_dict["Potassium, Whole Blood"] = labs.
    #     labs_dict["Sodium"] = labs.
    #     labs_dict["Sodium, Whole Blood"] = labs.
    #     labs_dict["Urea Nitrogen"] = labs.
    #     labs_dict["White Blood Cells"] = labs.
    #     all_data.append(labs_dict)

    # return jsonify(all_data)

# @app.route("/data/died")
# def data():
#     session = Session(engine)
#     results = session.query(died).all()

#     all_data = []
#     for died in results:
#         died_dict = {}
    #     died_dict["ROW_ID"] = died.ROW_ID
    #     died_dict["SUBJECT_ID"] = died.SUBJECT_ID
    #     died_dict["HADM_ID"] = died.HADM_ID
    #     died_dict["ADMITTIME"] = died.ADMITTIME
    #     died_dict["DEATHTIME"] = died.DEATHTIME
    #     died_dict["ADMISSION_TYPE"] = died.ADMISSION_TYPE
    #     died_dict["ADMISSION_LOCATION"] = died.ADMISSION_LOCATION
    #     died_dict["DISCHARGE_LOCATION"] = died.DISCHARGE_LOCATION
    #     died_dict["INSURANCE"] = died.INSURANCE
    #     died_dict["LANGUAGE"] = died.LANGUAGE
    #     died_dict["RELIGION"] = died.RELIGION
    #     died_dict["MARITAL_STATUS"] = died.MARITAL_STATUS
    #     died_dict["ETHNICITY"] = died.ETHNICITY
    #     died_dict["EDREGTIME"] = died.EDREGTIME
    #     died_dict["EDOUTTIME"] = died.EDOUTTIME
    #     died_dict["DIAGNOSIS"] = died.DIAGNOSIS
    #     died_dict["HOSPITAL_EXPIRE_FLAG"] = died.HOSPITAL_EXPIRE_FLAG
    #     died_dict["HAS_CHARTEVENTS_DATA"] = died.HAS_CHARTEVENTS_DATA
    #     died_dict["DAYS_TO_DEATH"] = died.DAYS_TO_DEATH
    #     all_data.append(died_dict)

    # return jsonify(all_data)

    # @app.route("/data/died")
# def data():
#     session = Session(engine)
#     results = session.query(survived).all()

#     all_data = []
#     for survived in results:
#         survived_dict = {}
    #     survived_dict["ROW_ID"] = survived.ROW_ID
    #     survived_dict["SUBJECT_ID"] = survived.SUBJECT_ID
    #     survived_dict["HADM_ID"] = survived.HADM_ID
    #     survived_dict["ADMITTIME"] = survived.ADMITTIME
    #     survived_dict["DEATHTIME"] = survived.DEATHTIME
    #     survived_dict["ADMISSION_TYPE"] = survived.ADMISSION_TYPE
    #     survived_dict["ADMISSION_LOCATION"] = survived.ADMISSION_LOCATION
    #     survived_dict["DISCHARGE_LOCATION"] = survived.DISCHARGE_LOCATION
    #     survived_dict["INSURANCE"] = survived.INSURANCE
    #     survived_dict["LANGUAGE"] = survived.LANGUAGE
    #     survived_dict["RELIGION"] = survived.RELIGION
    #     survived_dict["MARITAL_STATUS"] = survived.MARITAL_STATUS
    #     survived_dict["ETHNICITY"] = survived.ETHNICITY
    #     survived_dict["EDREGTIME"] = survived.EDREGTIME
    #     survived_dict["EDOUTTIME"] = survived.EDOUTTIME
    #     survived_dict["DIAGNOSIS"] = survived.DIAGNOSIS
    #     survived_dict["HOSPITAL_EXPIRE_FLAG"] = survived.HOSPITAL_EXPIRE_FLAG
    #     survived_dict["HAS_CHARTEVENTS_DATA"] = survived.HAS_CHARTEVENTS_DATA
    #     survived_dict["LENGTH_OF_STAY"] = survived.LENGTH_OF_STAY
    #     all_data.append(survived_dict)

    # return jsonify(all_data)

if __name__ == "__main__":
    app.run()