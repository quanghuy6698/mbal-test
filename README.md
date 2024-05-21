# MBAL test
## Step by step to run
### Run Backend (NestJS)
Open terminal

Go to folder mbal-test-be

And type:
```
npm i
npm run start
```
### Run Frontend (Angular)
Open terminal

Go to folder mbal-test-fe

And type:
```
npm i
ng serve
```
## Note**
### 1.
Because server is local, so you have to run Chrome without web security

Copy this to create a new Windows shortcut
```
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
```
Then open that shortcut.
### 2.
Cause this is just a demo, so APIs are very simple.

With the first form, typing a name starts with 'A' or 'a' to successfully pass the validator and go to the next form.

Otherwise you will see error.
