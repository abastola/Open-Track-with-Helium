# Intro
IoT solution with an open source and free to use tracking platform for high difficulty trails that observe lost hikers and higher rate of hiker injuries.

# Partners
- [IoT Off-Grid](https://www.iotoffgrid.com/ "IoT Off-Grid")
- [Helium Foundation](http://www.helium.foundation/ "Helium Foundation")
- [New York New Jersey Trail Conference](https://www.nynjtc.org/ "New York New Jersey Trail Conference")

# Import information
This dashboard currently works with WisNode TrackIt RAK2171 only. The project will be constantly updated to include more devices.

# Deploy your own Dashboard using Heroku and Github
Thanks to [GeeksForGeeks ](https://www.geeksforgeeks.org/how-to-deploy-node-js-app-on-heroku-from-github/ "GeeksForGeeks ")for steps to deploy Node.js app using Heroku
1. Create Free Account on Heroku
2. Clone this repository and push it to your Github
3. Goto https://dashboard.heroku.com/apps and Click on New > Create New App
4. Add app-name and Click on Create app
5. Open Deploy tab and Click on Github under Deployment method
6. Provide necessary persmission to provide Heroku access to your Github repo
7. After that, the Deployment section will show up where you can select pick them up and deploy or Manual Deployment, click Enable Automatic Deploys
8. Now we have to tell Heroku that our app is a NodeJS app.
9. Open the Settings tab scroll down and click “Add buildpack 
10. Select NodeJS from the options and click Save changes. Now, go back to the Deploy tab, and click Deploy Branch at the bottom.
11. Heroku will take the code and host it. 
12. Now open the Setting tab scroll and look for Domain. We can see a **URL** if we copy paste and run in the browser, we can see our Deployed App. 
13. Goto https://console.helium.com/devices
14. To add a Integration, go to Integrations on the left-hand menu. Select the integration to add - in this case, the HTTP integration.
15. The next step is to paste the HTTP endpoint.
16. Copy the URL from Heroku and paste it under Endpoint URL. HTTP Header and Value are not required and those can be left blank. Lastly, provide a name for the integration. Names do not have to be unique. Click Add Integration.
17. Goto Flows > Devices
18. Drag and Drop the Device to the Dashboard
19. Goto Flows > Integrations 
20. Drag and Drop the Integration we just added to the Dashboard
21. Connect Device to Integration in the Dashboard
22. Your device should start sending location data to your Heroku app
23. Your device's location can be accessred from https://APP-NAME.herokuapp.com/tracker/DEVICEID







