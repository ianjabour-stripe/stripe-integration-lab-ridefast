# Stripe Integration Lab

This repository provides the boilerplate UI for a car rental service company without any payment integration code added.

![Image of sample UI](./demo-image.png)

## Prerequisites

This project is built using Stripe's Node SDK and requires a version of Node.js installed on your machine.

For details on how to install Node.js see: https://nodejs.org/en/download

All other dependencies will be automatically installed for you when you run `npm install` in the *Getting started* instructions.

You will also need a Stripe Account to fill out your `.env` file and run the set up script. If you would like to create a new Stripe Account
you can do so [here](https://dashboard.stripe.com/register). 

## Getting started

1. Clone this repo:

~~~
git clone git@github.com:ianjabour-stripe/stripe-integration-lab-ridefast.git && cd stripe-integration-lab-ridefast
~~~

2. Create a `.env` file based on the `.env.example` and fill in your API secret key.

> The API public (`pk_test...`) and secret (`sk_test...`) test keys can be found on the [API keys page](https://dashboard.stripe.com/test/apikeys) in your Stripe Dashboard.

~~~
cp .env.example .env
~~~

3. Install the project dependencies

~~~
npm install
~~~

3. Run the application (both client and server)

~~~
npm start
~~~

> If you prefer to run the client and server in separate terminal panes you can run `npm run start-client` and `npm run start-server` respectively.

4. Go to [http://localhost:3000/stripe-integration-lab-ridefast](http://localhost:3000/stripe-integration-lab-ridefast) and verify the application loads. You should see something identical to [our live example](https://ianjabour-stripe.github.io/stripe-integration-lab-ridefast/).

(server will run on http://localhost:4242)

5. For convenience there's a script which will create the products and prices for all the cars listed in the application. After you run the script you should see them listed on the [product list page](https://dashboard.stripe.com/test/products?active=true) in the Stripe Dashboard.

> The script ensures the products will have the same IDs as the ones listed in `src/products.json`

~~~
npm run create-products
~~~

6. Start building your Stripe integration. In practice, you should only need to update the `CheckoutPage.jsx` and `server.js` files to get Stripe integrated into the application.