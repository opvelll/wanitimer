# wanitimer

100 日経つまであと何日か表示する Web アプリ。  
（モチーフ : 100 日後に死ぬワニ）

環境 : AWS Amplify

アドレス:
画面:  
![wanitimer](./src/assets/wanitimer3.png)

## Project setup

```
git clone wanitimer
cd ./wanitimer

npm install

amplify init


amplify add auth
Using service: Cognito, provided by: awscloudformation

 The current configured provider is Amazon Cognito.

 Do you want to use the default authentication and security configuration? Default configuration
 Warning: you will not be able to edit these selections.
 How do you want users to be able to sign in? Email
 Do you want to configure advanced settings? No, I am done.


amplify add api
? Please select from one of the below mentioned services: GraphQL
? Provide API name: wanitimer
? Choose the default authorization type for the API Amazon Cognito User Pool
Use a Cognito user pool configured as a part of this project.
? Do you want to configure advanced settings for the GraphQL API No, I am done.
? Do you have an annotated GraphQL schema? Yes
? Provide your schema file path: C:\Users\...\wanitimer\src\schema.graphql

amplify push -y

npm run serve
```
