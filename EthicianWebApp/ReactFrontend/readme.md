# MultiChatXpert Web Application

Welcome to the MultiChatXpert web application repository. This project serves as the online platform for HLB Tech's product, MultiChatXpert. Users can learn about our company and product, purchase a subscription, and try out the product demo.

## Technologies Used

- **Frontend**: React
- **Backend**: Django
- **Database**: Postgres

## Features

- **Home Page**: Introduces HLB Tech and MultiChatXpert, providing information about the product and the company.
- **About Page**: Introduces the team at HLB Tech
- **Pricing Page**: Users can purchase subscriptions to MultiChatXpert.
- **Product Demo**: Users can access a demo of MultiChatXpert to explore its features.

## Installation

To run this project locally, follow these steps:

### Backend Setup

```bash
# Clone the repository
git clone <repository-url>
cd multichatxpert/backend

# Create and activate virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the Django development server
python manage.py runserver
```


### Frontend Setup
```bash
# From the root of the repository
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

### ENV setup
**1.** Create a .env file in the main MultiChatXpert Project folder

**2.** Create an OPENAI_API_KEY variable, and set it equal to your OpenAI API key

**3.** For later versions, include your ANTHROPIC_API_KEY and GOOGLE_API_KEY for access to the other LLMs

Access the application at http://localhost:3000/.