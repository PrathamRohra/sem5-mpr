import pickle
import json
import numpy as np

__locations = None
__data_columns = None
__linear_model = None
__lasso_model = None
# __decision_tree_model = None

def get_estimated_price(location, sqft, bhk, bath, model_type):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    if model_type == 'Linear Regression':
        return round(__linear_model.predict([x])[0], 2)
    elif model_type == 'Lasso Regression':
        return round(__lasso_model.predict([x])[0], 2)
    elif model_type == 'Decision Tree':
        return round(__decision_tree_model.predict([x])[0], 2)

def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __data_columns
    global __locations

    with open("C:\\Users\\rohra\\OneDrive\\Desktop\\Sem5-MPR\\server\\artifacts\\columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]  # first 3 columns are sqft, bath, bhk

    global __linear_model
    if __linear_model is None:
        with open("C:\\Users\\rohra\\OneDrive\\Desktop\\Sem5-MPR\\server\\artifacts\\banglore_home_prices_model.pickle", "rb") as f:
            __linear_model = pickle.load(f)

    global __lasso_model
    if __lasso_model is None:
        with open("C:\\Users\\rohra\\OneDrive\\Desktop\\Sem5-MPR\\server\\artifacts\\banglore_home_prices_lasso_model.pickle", "rb") as f:
            __lasso_model = pickle.load(f)

    # global __decision_tree_model
    # if __decision_tree_model is None:
    #     with open("C:\\Users\\rohra\\OneDrive\\Desktop\\Sem5-MPR\\server\\artifacts\\decision_tree_model.pkl", "rb") as f:
    #         __decision_tree_model = pickle.load(f)

    print("loading saved artifacts...done")

def get_location_names():
    return __locations

def get_data_columns():
    return __data_columns
