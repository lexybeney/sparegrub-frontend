<img alt="SpareGrub Logo" src="./public/logo_light_bg.png" width="400px" style="display:block;margin:0 auto;"/>

# SpareGrub - Reducing Food Wastage

## The concept

As part of my software development bootcamp, I had to come up with an idea for my final project to demonstrate my understanding of React. [SpareGrub](https://sparegrub.co.uk) was created as my answer to reducing food wastage.

This is the frontend repo, for the backend repo click [here](https://github.com/lexybeney/sparegrub-backend).

## What I used

- React ([Create React App](https://github.com/facebook/create-react-app))
- [Axios](https://github.com/axios/axios) for API calls
- [SCSS](https://sass-lang.com/) and [Bootstrap](https://github.com/twbs/bootstrap) for styling
- [Redux](https://redux.js.org/) for state management
- [Joi](https://github.com/hapijs/joi) for validation
- [Bing Maps](https://learn.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-address) for forward geocoding
- [GSAP](https://github.com/greensock/GSAP) for animation

## Main features

- Create an account
- Search for available items in your area
- Add to your basket and checkout items
- Edit your profile
- Add items to your personal listing for collection

## How to use

### 1. To run locally

#### Clone this repo

```bash
git clone https://github.com/lexybeney/sparegrub-frontend.git
```

#### Install dependencies

```bash
npm i
```

#### Run locally

```bash
npm start
```

### 2. Visit the live site

https://sparegrub.co.uk

#### a. Create your own profile

Use an SW or TN postcode to see other items

#### b. Login with the test account

- Username: bakerbun
- Password: hello!

## Future development

I have a number of aspects I would like to work on in the future, which I was unable to do in the first development phase due to time restraints. These are listed below:

- Home page
  - Lazy loading or 'load more' button
  - Filter functionality e.g. distance, collection details (time of day)
- Notifications
- In-app messaging
- Basket
  - Show a countdown of items in cart with 'keep item' button that resets the counter
  - Suggest other items by the same user if they already have one in the basket
  - Group basket items by user
  - Produce estimated CO2 emissions for each trip based on items in your basket
- Password reset functionality
- Edit items in your listing
- Add to listing - ability to upload picture of food
- Delete account button
- Signup
  - Specify error message if username or email already exists
  - Don’t allow same phone number for users
- Have ‘resend collection details’ button next to each item
