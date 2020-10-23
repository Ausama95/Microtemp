import firebase
import serial
import datetime
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase import firebase

cred = credentials.Certificate("bbc-microbit-sensor-firebase-adminsdk-xilte-c922667b53.json")
firebase_admin.initialize_app(cred)

FBConn = firestore.client()
FBConn2 = firebase.FirebaseApplication('https://bbc-microbit-sensor.firebaseio.com/', None)


# Set up the Serial connection to capture the Microbit communications
ser = serial.Serial()
ser.baudrate = 115200
ser.port = "COM3"
ser.open()

mostrecentKeyID = 0
mostrecentTimestamp = 0
temperatureMax = -200
temperatureLow = 300
lightMax = -200
lightLow = 300

room = "Unknown"
microbitdata = str(ser.readline())
print("Syncing the data, please wait!..")

# Loop forever
while True:

    #makes sure that the data sync correctly
    check = str(ser.readline())

    if "start" in check:
        #Realtime database for max and low
        myGetResults = FBConn2.get('/All_data/', None)

        #Check the date of the day to restart the stats for the new day
        day = int(datetime.datetime.today().strftime("%Y%m%d"))


        # Loop around the returned results from the database until we find the latest timestamp
        for keyID in myGetResults:
            if int(myGetResults[keyID]['Timestamp'] > mostrecentTimestamp):
                mostrecentTimestamp = int(myGetResults[keyID]['Timestamp'])
                mostrecentKeyID = myGetResults[keyID]
        
        # Get the latest recorded Temperature, convert it to a int and assign to a variable
        temperatureMax_db = int(myGetResults[keyID]['Temperature_Max'])
        temperatureLow_db = int(myGetResults[keyID]['Temperature_Low'])
        lightMax_db = int(myGetResults[keyID]['Light_Max'])
        lightLow_db = int(myGetResults[keyID]['Light_Low'])
        #------------------------------------------------------------------------------------

        microbitdata = str(ser.readline())
        # Cleanup the data from the microbit and convert it to an integer
        deviceName = microbitdata[2:]
        deviceName = deviceName.replace(" ","")
        deviceName = deviceName.replace("\\r\\n","")
        deviceName = deviceName.replace("'","")

        now = int(datetime.datetime.today().strftime("%Y%m%d%H"))
        date = str(datetime.datetime.today().strftime("%Y/%m/%d %H:%M"))

        #Temp............................................................................
        microbitdata = str(ser.readline())
        # Cleanup the data from the microbit and convert it to an integer
        temperature = microbitdata[2:]
        temperature = temperature.replace(" ","")
        temperature = temperature.replace("\\r\\n","")
        temperature = temperature.replace("'","")
        temperature = int(temperature)

        # Pause for 0.5 seconds between loops
        time.sleep(0.5)
        #Temp............................................................................END

        #Light............................................................................
        # Read in a line from the Microbit, store it in variable 'microbitdata' as a string
        microbitdata2 = str(ser.readline())
        
        # Cleanup the data from the microbit and convert it to an integer
        light = microbitdata2[2:]
        light = light.replace(" ","")
        light = light.replace("\\r\\n","")
        light = light.replace("'","")
        light = int(light)

        # Pause for 0.5 seconds between loops
        time.sleep(0.5)
        #Light............................................................................END

        #Store the light and temp Max/Low
        if temperatureMax_db < temperature:
            temperatureMax = temperature
        if temperatureLow_db > temperature:
            temperatureLow = temperature
        if lightMax_db < light:
            lightMax = light
        if lightLow_db > light:
            lightLow = light
        
        # Create our data structure to send data to Firebase.
        # We can add as many bits of individual data as we wish.
        data_to_upload = {
            # Label name : variable to be sent
            u'Device_Name' : deviceName,
            u'Room_Name' : room,
            u'Temperature' : temperature,
            u'Temperature_Max' : temperatureMax,
            u'Temperature_Low' : temperatureLow,
            u'Light_Level' : light,
            u'Light_Max' : lightMax,
            u'Light_Low' : lightLow,
            u'Date' : date,
            u'Timestamp' : now
        }

        # Add the data structure to Firebase under the defined heading... 'MyTemperature'
        FBConn.collection(u'Microbit').document(u'Doc').set(data_to_upload)

        #Send and store the data in the collection-------------------------------------------
        data_to_upload = {
            # Label name : variable to be sent
            u'Device_Name' : deviceName,
            u'Room_Name' : room,
            u'Temperature_Average' : (temperatureMax + temperatureLow) / 2,
            u'Temperature_Max' : temperatureMax,
            u'Temperature_Low' : temperatureLow,
            u'Light_Level_Average' : (lightMax + lightLow) / 2,
            u'Light_Max' : lightMax,
            u'Light_Low' : lightLow,
            u'Date' : date,
            u'Timestamp' : now
        }

        #Realtime database
        FBConn2.post('/All_data/',data_to_upload)

        # Save data every hour----------------------------------------------------------------
        now2 = int(datetime.datetime.today().strftime("%Y%m%d%H"))
        
        if now != now2:
            FBConn.collection(u'Microbit').document(u'Doc').collection(u'collected_data').add(data_to_upload)

        # Check if it's a new day to restart the loop-----------------------------------------
        day2 = int(datetime.datetime.today().strftime("%Y%m%d"))
        if day != day2:
            mostrecentKeyID = 0
            mostrecentTimestamp = 0
            temperatureMax = -200
            temperatureLow = 300
            lightMax = -200
            lightLow = 300

        # Print the returned unique ID from Firebase on receipt of our data
        print("The temperature is: ", temperature, "C")
        print("The max temperature is: ", temperatureMax, "C")
        print("The lowest temperature is: ", temperatureLow, "C")
        print("The light level is: ", light)
        print("The max light level is: ", lightMax)
        print("The lowest light level is: ", lightLow)


# Close the serial connection
ser.close()
