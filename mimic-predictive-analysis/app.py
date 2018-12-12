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

# initialize db here


#################################################
# Database Setup
#################################################

# engine = create_engine("sqlite:///db/deaths.db")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# Save reference to each table
deaths = Base.classes.cause_o_death

@app.before_first_request
def bfr():
    create_db()
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/deaths.db'
# # app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')
#     db = SQLAlchemy(app)


#     db.drop_all()

    # create_db()

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/teampage")
def teampage():
    """Return the homepage."""
    return render_template("teampage.html")

@app.route("/map/year=<year>")
def mapper(year):

    yearDict = {"year": year}

    return render_template("choropleth.html", dict=yearDict)

@app.route("/drill/start=<start>/end=<end>/state=<state>")
def driller(start,end,state):

    valuesDict = {"start": start, "end": end, "state": state}

    return render_template("drill.html", dict=valuesDict)

@app.route("/drillCause/start=<start>/end=<end>/cause=<cause>")
def drillCause(start,end,cause):

    valuesDict = {"start": start, "end": end, "cause": cause}

    return render_template("drillCause.html", dict=valuesDict)

@app.route("/data")
def data():
    session = Session(engine)
    results = session.query(deaths).all()

    all_data = []
    for death in results:
        death_dict = {}
        death_dict["id"] = death.id
        death_dict["year"] = death.year
        death_dict["state"] = death.state
        death_dict["cause"] = death.cause
        death_dict["deaths"] = death.deaths
        death_dict["death_rate"] = death.death_rate
        all_data.append(death_dict)

    return jsonify(all_data)

# #********************
# # TESTING
# #********************


@app.route("/data/year=<year>")
# CHOROPLETH: all states, single year, and cause of death
def year(year):
    session = Session(engine)

    #placeholder for selection statement, so we don't return the entire table and slow down query

    results = session.query(deaths).filter(deaths.year == year).all()

    all_data = []
    for death in results:
        death_dict = {}
        death_dict["id"] = death.id
        death_dict["year"] = death.year
        death_dict["state"] = death.state
        death_dict["cause"] = death.cause
        death_dict["deaths"] = death.deaths
        death_dict["death_rate"] = death.death_rate
        all_data.append(death_dict)

    return jsonify(all_data)

#@app.route("/data/<year>", defaults={"cause":None})
@app.route("/data/year=<year>/cause=<cause>")
# CHOROPLETH: all states, single year, and cause of death
def yearcause(year, cause):
    session = Session(engine)

    #placeholder for selection statement, so we don't return the entire table and slow down query

    results = session.query(deaths).filter(deaths.year == year).filter(deaths.cause == cause).all()

    all_data = []
    for death in results:
        death_dict = {}
        death_dict["id"] = death.id
        death_dict["year"] = death.year
        death_dict["state"] = death.state
        death_dict["cause"] = death.cause
        death_dict["deaths"] = death.deaths
        death_dict["death_rate"] = death.death_rate
        all_data.append(death_dict)

    return jsonify(all_data)

@app.route("/data/year=<year>/state=<state>")
# CHOROPLETH: all states, single year, and cause of death
def yearstate(year,state):
    session = Session(engine)

    #placeholder for selection statement, so we don't return the entire table and slow down query

    results = session.query(deaths).filter(deaths.year == year).filter(deaths.state == state).all()

    all_data = []
    for death in results:
        death_dict = {}
        death_dict["id"] = death.id
        death_dict["year"] = death.year
        death_dict["state"] = death.state
        death_dict["cause"] = death.cause
        death_dict["deaths"] = death.deaths
        death_dict["death_rate"] = death.death_rate
        all_data.append(death_dict)

    return jsonify(all_data)

@app.route("/data/state=<state>")
# CHOROPLETH: all states, single year, and cause of death
def state(year,state):
    session = Session(engine)

    #placeholder for selection statement, so we don't return the entire table and slow down query

    results = session.query(deaths).filter(deaths.state == state).all()

    all_data = []
    for death in results:
        death_dict = {}
        death_dict["id"] = death.id
        death_dict["year"] = death.year
        death_dict["state"] = death.state
        death_dict["cause"] = death.cause
        death_dict["deaths"] = death.deaths
        death_dict["death_rate"] = death.death_rate
        all_data.append(death_dict)

    return jsonify(all_data)

@app.route("/data/start=<start>/end=<end>/state=<state>")
# CHOROPLETH: all states, single year, and cause of death
def yearrangestate(start,end,state):
    session = Session(engine)

    #placeholder for selection statement, so we don't return the entire table and slow down query

    results = session.query(deaths).filter(deaths.year >= start).filter(deaths.year <= end).filter(deaths.state == state).all()

    all_data = []
    for death in results:
        death_dict = {}
        death_dict["id"] = death.id
        death_dict["year"] = death.year
        death_dict["state"] = death.state
        death_dict["cause"] = death.cause
        death_dict["deaths"] = death.deaths
        death_dict["death_rate"] = death.death_rate
        all_data.append(death_dict)

    return jsonify(all_data)

@app.route("/data/start=<start>/end=<end>/cause=<cause>")
# CHOROPLETH: all states, single year, and cause of death
def yearrangecause(start,end,cause):
    session = Session(engine)

    #placeholder for selection statement, so we don't return the entire table and slow down query

    results = session.query(deaths).filter(deaths.year >= start).filter(deaths.year <= end).filter(deaths.cause == cause).all()

    all_data = []
    for death in results:
        death_dict = {}
        death_dict["id"] = death.id
        death_dict["year"] = death.year
        death_dict["state"] = death.state
        death_dict["cause"] = death.cause
        death_dict["deaths"] = death.deaths
        death_dict["death_rate"] = death.death_rate
        all_data.append(death_dict)

    return jsonify(all_data)

@app.route("/data/allstates")
# CHOROPLETH: all states, single year, and cause of death
def allstates():
    session = Session(engine)

    #placeholder for selection statement, so we don't return the entire table and slow down query

    results = session.query(deaths.state).distinct()
    data = []
    for result in results:
        data.append(result[0])
    return jsonify(data)

# USER TABE: year, state, cause

if __name__ == "__main__":
    app.run()