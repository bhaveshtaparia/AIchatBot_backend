# AI Chatbot (Without using any external APIs)

This chatbot is tailored to address inquiries from users interested in course purchases. Additionally, organizations have the ability to upload their datasets, empowering our chatbot to provide responses based on the uploaded data. As a result, our chatbot serves as a versatile AI solution with global applicability.

## Admin Features:

1. **Dataset Upload**: Admins can upload their dataset in CSV format containing questions and corresponding answers. The chatbot utilizes this dataset to respond to user queries effectively. Upon uploading a new dataset, the previous data is replaced with the new dataset in the database.

2. **User Satisfaction Feedback and Performance Monitoring**: The chatbot prompts ask for feedback after every 5 questions to gather insights into user satisfaction. This feedback, along with conversation logs between users and the chatbot, is stored for performance monitoring and improvement. Admins can download feedback data in CSV format for analysis and decision-making.

3. **Doubt Assistant**: In cases where the chatbot is unable to provide a satisfactory answer, or when users express dissatisfaction with the response, their queries are stored in a separate database for resolution. Admins can review these doubts, provide appropriate answers, and update the database. Additionally, the chatbot incorporates a one-time clickable dislike button for users to signal unsatisfactory responses (Admin will do by downloading csv file).

4. **Data Sharing with Sales Team**: Conversations between users and the chatbot, along with user email addresses, are stored for analysis and data sharing with the sales team. This enables the sales team to understand user preferences and tailor offers accordingly. Only user queries are stored to maintain relevance.

## User Features:

1. **Simple Layout**: The user interface is designed to be intuitive and user-friendly, allowing users to easily ask questions and seek assistance.

## Chatbot Algorithm:

The chatbot utilizes Natural Language Processing (NLP) techniques to process user queries. Upon receiving a query, the chatbot tokenizes the query into individual words and matches them against the dataset. The response with the highest keyword match is selected as the answer. While this approach provides a basic level of functionality, further improvements in accuracy can be achieved through advanced NLP techniques and algorithm enhancements.

## Setup Instructions:

### Common Operations for Frontend and Backend:

1. Clone the repository.
2. Run `npm install` in the terminal to install dependencies.

### Frontend Setup:(https://github.com/bhaveshtaparia/AIchatBot_Frontend)

3. Replace the `uri` file with the backend API endpoint in the frontend code.
4. Run `npm start` in the terminal to start the frontend server.

### Backend Setup:(https://github.com/bhaveshtaparia/AIchatBot_backend)

3. Configure the environment variables in the `.env` file:

PORT=5000
DBURI="Your_database_link_here"
SECRETKEY="Your_secret_key_for_authentication"
EXPIRE=1

4. Run `nodemon app.js` in the terminal to start the backend server.


# How to Use:(https://a-ichat-bot-frontend.vercel.app)

## LoginPage:
### User:
Login with your email and password.

### Admin:
Use the following credentials:
- Email: bhavesh@gmail.com
- Password: 1234567
(Please do not misuse these credentials; they are provided for checking functionality purposes only.)

## Chat:
You can interact with the chatbot using the input box. Additionally, there is a dislike button available for providing feedback on responses.

## Admin Page:
This section is accessible only to administrators:
1. **Upload CSV File to Train Our Chatbot:**
   Upload a CSV file containing two columns (question, answer) to train the chatbot.
   
2. **Download CSV File for Monitoring Chatbot Results:**
   Download a CSV file containing user feedback and transcripts of user interactions with the chatbot.

3. **Download CSV File for Sales Team:**
   Download a CSV file containing data relevant to the sales team, including user email, questions asked, and dates of interaction.
   
4. **Unresolved Question:**
   Download a CSV file containing unresolved questions for further review and resolution.

LoginPage:
![loginpage](https://github.com/bhaveshtaparia/AIchatBot_Frontend/assets/103322001/dcfa1dde-fb6b-4281-a571-d6e1246f91c3)

ChatPage:
![chatpage_](https://github.com/bhaveshtaparia/AIchatBot_Frontend/assets/103322001/a7068c45-29b0-4e11-a18d-a11bfc8488ea)

AdminPage:
![Adminpage](https://github.com/bhaveshtaparia/AIchatBot_Frontend/assets/103322001/dd08d6c7-0006-4d74-8917-9f9e3f79c93b)
