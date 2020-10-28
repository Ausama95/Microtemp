# Microtemp
## Microbit project

You can find the website [here](https://microtemp.vercel.app/)



1- you need to install React's library in the website file

To install React!
- Open a terminal in the file "website" and run the command:
 - `npm install next react react-dom`

To run the website on `localhost:3000`
 - Use `npm run dev`



2- you need to install Python from [here](https://www.python.org/downloads/)

Packages you need to install for the Microbit program:
- Run all these comaneds in Windows CMD.

 - `pip install firebase`
 - `pip install pyserial`
 - `pip install firebase-admin`
 - `pip install python_jwt`
 - `pip install --upgrade gcloud`
 - `pip install sseclient`
 - `pip install pycrypto`
 - `pip install cryptography`
 - `pip install pycryptodome`
 - `pip install pycryptodomex`



3- Update the "COM Port" based on your system
- Open `database_sync2.py` in a text editor program and change line 21 to what ever COM Port numer the chip is using by replacing "COM3":
```py
ser.port = "COM3"
```
- You can find which COM Port numer the chip is using by following the steps:
  - Open Device Manager (Start → Control Panel → Hardware and Sound → Device Manager)
  - Look in the Device Manager list, open the category "Ports" and find the matching COM Port.
  - Take the number in the bracket behind the port description.



4- you need to copy the code from "MicrobitCode.py" and put it inside the Microbit by using the [Micro Code Editor](https://microbit.org/code/)
 - Create a new projet.
 - Select Python from menu bar at the top in the editor page.
 - Paste the code.
 - Click on Download.

5- To register a new user in the website Click [here](https://microtemp.vercel.app/users/register)

For further questions, you can contact me at `Ausama95@yahoo.com`

Developed by: Osama Khalid Walid Ahmed