from flask import jsonify
import requests
import json
from sqlalchemy import create_engine
from sqlalchemy import inspect


# Import and establish Base for which classes will be constructed 
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

# Import modules to declare columns and column data types
from sqlalchemy import Column, Integer, String, Float

from sqlalchemy.orm import Session
engine = create_engine('sqlite:///db/deaths.sqlite')


def create_db():
    
# Create the Death class
    class Death(Base):
        __tablename__ = 'cause_o_death'
        id = Column(Integer, primary_key=True)
        year = Column(Integer)
        state = Column(String(255))
        cause = Column(String(255))
        deaths = Column(Integer)
        death_rate = Column(Float)
    Base.metadata.drop_all(engine)
    url = 'https://data.cdc.gov/api/views/bi63-dtpu/rows.json?accessType=DOWNLOAD'

    resp = requests.get(url)

    

    session = Session(bind=engine)

    Base.metadata.create_all(engine)

    for x in resp.json()['data']:
        entry = Death(year = x[8], state = x[11], cause = x[10], deaths = x[12], death_rate = x[13])
        session.add(entry)
        
    session.commit()
    print('Session Committed')

# results = session.query(Death).filter(Death.year == 2003)
# for result in results:
#     print(result.state)