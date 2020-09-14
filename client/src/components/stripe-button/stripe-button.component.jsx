import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { firestore } from "../../firebase/firebase.utils";
import axios from "axios";

const StripeCheckoutButton = ({ price, cartItems }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HKFQaCHuUVJ8ShaaUSrsvQK4P9wyNwliSnSqZIq8R00fdlAA08MX1vg5t9EiResWfkWxT0rGrSDnDJK4JSHHyQ200bkN4nQvg";

  const onToken = (token) => {
    const { card, created } = token
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    }).then(response => {
      alert('Payment Succesful')
    }).catch(error => {
      console.log('Payment error: ', JSON.parse(error))
      alert('There was an  issue with your payment. Please make sure you use the provided credit card.  ')
    });
    const {
      address_city: city,
      address_country: country,
      address_line1: location,
      address_zip: zip,
      name,
    } = card;
    const date = new Date(created * 1000);
    firestore.collection("orders").add({
      items: cartItems,
      date,
      location,
      city,
      country,
      zip,
      name,
      price,
    });
    //
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Wizy Clothing"
      billingAddress
      shippingAddress
      image="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxMjAwcHgiIGhlaWdodD0iOTAwcHgiIHZpZXdCb3g9IjAgMCAxMjAwIDkwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTIwMCA5MDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxkZWZzPgoJCTxyZWN0IGlkPSJTVkdJRF8xXyIgeD0iMTIzLjg1NyIgeT0iMjk0Ljg5NSIgd2lkdGg9Ijk0Ny4xNDMiIGhlaWdodD0iMjQ4LjEwNSIvPgoJPC9kZWZzPgoJPGNsaXBQYXRoIGlkPSJTVkdJRF8yXyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMV8iICBvdmVyZmxvdz0idmlzaWJsZSIvPgoJPC9jbGlwUGF0aD4KCTxwYXRoIGNsaXAtcGF0aD0idXJsKCNTVkdJRF8yXykiIGZpbGw9IiM1NTVBNTUiIGQ9Ik0yMzguNTMzLDM4My4zODdjLTUuNjg0LDE1Ljc0Ny0xMS4zMTEsMzEuNDA2LTE2Ljk3Nyw0Ny4wNTYKCQljLTYuODQ3LDE4Ljg5OS0xMy44NTUsMzcuNzUxLTIwLjUwMiw1Ni43MjRjLTEuOTQzLDUuNTM0LTUuMDc2LDcuNzg2LTEwLjk3OSw3LjgwNWMtMTcuMzg3LDAuMDYyLTE4LjM5Ny0wLjU0Mi0yMi4zNTgtMTcuMzg2CgkJYy0wLjQyOC0xLjgyMi0wLjU0Mi0zLjU0MiwwLjMwNS01LjI3M2MxLjI5NS0yLjYyMywyLjUwNS01LjI5NiwzLjgtNy45MTVjMi43OS01LjY0NSw1LjYxOC0xMS4yNzQsOC43NjEtMTcuNTc4CgkJYzMuNTUxLDYuODUyLDMuNTEzLDE0LjA1Nyw2LjQ5NCwyMS44MTFjMy43NjEtMTAuNzg4LDcuMDY1LTIwLjQyMiwxMC40OTQtMzAuMDA3YzkuMDU1LTI1LjMyOCwxOC41MjEtNTAuNTEyLDI3LjA2Mi03Ni4wMDQKCQljMy4wNTctOS4xMTksOS40MTctOC4wMDMsMTYuMTk4LTguMjMyYzYuMzQxLTAuMjEsMTAuNTU5LDEuNDEzLDEyLjgyNSw4LjIwMmMxMS4zMzIsMzQuMDc3LDI0LjQ2Myw2Ny41NDUsMzQuOTQ3LDEwMS45MgoJCWMwLjMwNSwxLjAxMSwwLjk2MiwxLjkyMywxLjczMywzLjQyNmMxMC4wNDYtMzUuMjU3LDIyLjU3OC02OC45NDksMzMuNTk0LTEwMy4xNDFjMy4wMS05LjMzNyw0LjI2Ny0xMC4xNzcsMTQuMDY1LTEwLjIxNgoJCWM0LjcwNC0wLjAyMyw5LjQxOC0wLjAwOSwxNS4wNjMtMC4wMDljLTUuNDI2LDE1LjE4OC0xMC41OTgsMjkuNjE2LTE1Ljc0OSw0NC4wNTFjLTEwLjg3NSwzMC40NDItMjEuODI1LDYwLjg2LTMyLjUxLDkxLjM1OAoJCWMtMS4yNjYsMy42MDctMi43NTEsNS4wNTgtNi42MjYsNC45NjhjLTIzLjI5Mi0wLjU2Mi0xOC4yNzQsMy4yNC0yNS45NDctMTcuODk3QzI2MC45Miw0NDUuOTMxLDI0OS43OTksNDE0Ljc0MSwyMzguNTMzLDM4My4zODciCgkJLz4KCTxwYXRoIGNsaXAtcGF0aD0idXJsKCNTVkdJRF8yXykiIGZpbGw9IiM1NTVBNTUiIGQ9Ik05MTMuMTQ4LDQyMC40NTJjLTAuMjQsOS45NDQsMC44NjUsMjAuNDQ3LDQuNzUsMzAuNTQ3CgkJYzYuMzgsMTYuNjEsMTkuNzcsMjUuNzUyLDM4LjE5MywyNi4wMjRjMTkuMjQ2LDAuMjgxLDMyLjg2LTguMDA3LDM5LjE0Ni0yNS4yN2M3Ljk2Mi0yMS43OTEsNy44OTMtNDMuOTU5LTAuMzgyLTY1LjY3NQoJCWMtNS44MDYtMTUuMjMtMTcuNzc3LTIzLjAwMy0zMy43OTQtMjQuMTE5Yy0xNS41NTgtMS4wNzktMjkuMjgsMy4xODItMzguMzc0LDE2Ljc3NQoJCUM5MTQuNDM0LDM5MS4wNSw5MTIuODk5LDQwNS4yMjIsOTEzLjE0OCw0MjAuNDUyIE04ODcuMDY2LDQyMC4xNDZjMC4xNTItMjIuMTQ1LDQuNjc1LTQyLjM4NCwyMC4wOTMtNTguMTE2CgkJYzIwLjE4Ni0yMC42MjQsNDUuMjY4LTI0LjIzNCw3MS45OTctMTYuNzM0YzI2LjIzMiw3LjM2NywzOS44NzgsMjYuNzk2LDQ1LjI4Nyw1Mi40NThjMy42MjgsMTcuMjYzLDMuMjE3LDM0LjYzLTIuMTE0LDUxLjY0MgoJCWMtOS43MjIsMzAuOTktMzUuMzM3LDQ4LjU2OS02Ny43MjIsNDcuMzc1Yy00Mi4xMDctMS41NTUtNjQuMzgtMzEuNDItNjcuMTMzLTY3LjgxMQoJCUM4ODcuMjQ3LDQyNS43OTIsODg3LjE4MSw0MjIuNjE4LDg4Ny4wNjYsNDIwLjE0NiIvPgoJPHBhdGggY2xpcC1wYXRoPSJ1cmwoI1NWR0lEXzJfKSIgZmlsbD0iIzU1NTg1NSIgZD0iTTUzMy41MzMsMzczLjRjLTI2LjQ2MiwwLTUxLjU4My0wLjE5Ni03Ni42ODQsMC4xNDQKCQljLTUuODQ2LDAuMDg1LTcuMTMxLTEuNzE0LTYuOTQxLTcuMjE5YzAuNC0xMS43MzksMC4xMDUtMTEuNzQ5LDExLjg5Mi0xMS43NDljMzEuOTIsMCw2My44MzgsMC4xMDUsOTUuNzU3LTAuMTE0CgkJYzUuMTk5LTAuMDMyLDcuMTEzLDEuMDk4LDYuOTUxLDYuNjk0Yy0wLjE2MSw1LjgwNy0xLjkwNCwxMC41MDQtNS41MTMsMTQuODU5Yy0yNS4xNTgsMzAuMzE3LTUwLjI1OSw2MC42NzktNzUuMzY5LDkxLjAzNQoJCWMtMi4xMjQsMi41NjItNC4xNzEsNS4xODgtNy4yMDgsOC45OWg3LjY4NGMyMy43NzcsMCw0Ny41NDQsMC4xMDksNzEuMzEyLTAuMTA0YzQuNTIzLTAuMDQ1LDYuMjk1LDAuODMsNi4yMDksNS44NTgKCQljLTAuMiwxMy4wNywwLjA2NiwxMy4wNzQtMTMuMjkzLDEzLjA3NGMtMzIuMTQ3LDAtNjQuMjg1LTAuMTUyLTk2LjQzMywwLjE0N2MtNS42MTgsMC4wNTMtNi43NzktMS43NzktNi41NTEtNi44NTcKCQljMC4yMzgtNC45NzcsMS40OTUtOS4xMjcsNC43MjQtMTMuMDE2YzI2LjMyOS0zMS42OTgsNTIuNTQzLTYzLjQ5Myw3OC43NjctOTUuMjc3QzUzMC4yMjksMzc4LjE3MSw1MzEuNDI4LDM3Ni4zMDYsNTMzLjUzMywzNzMuNCIKCQkvPgoJPHBhdGggY2xpcC1wYXRoPSJ1cmwoI1NWR0lEXzJfKSIgZmlsbD0iIzU1NUE1NSIgZD0iTTc0Ni4xNDYsMzU0LjYzOWMtOC4wODUsMTcuMTY0LTE1LjgzNSwzMy42OTEtMjMuNjUzLDUwLjE4MgoJCWMtMTkuMzY4LDQwLjgyNS0zOS4yNjksODEuNDA2LTU3Ljg1NiwxMjIuNTc5Yy01LjM0MywxMS44MjktMTEuOTg3LDE3LjIwNS0yNC42MzUsMTUuMTg1Yy0yLjQxOS0wLjM4My00Ljk1LTAuMDU0LTcuNzg4LTAuMDU0CgkJYzAuNTkxLTQuOTE4LDMuMzIyLTguNTcsNS4yNzMtMTIuNDk2YzYuNDU2LTEyLjk2NCwxMi44OTUtMjUuOTI5LDE5LjYzNi0zOC43MzljMS42NzctMy4xOTcsMS45MjUtNS44MzIsMC4wMi04LjgKCQljLTAuNjEtMC45NDUtMS4wMS0yLjAzNi0xLjQzNy0zLjA4NWMtMi44MTEtNi44MjQtOS45MDQtMTMuNjM0LTguNDEtMjAuMDM3YzIuMDY1LTguODEzLDguODQ2LTE2LjUxOSwxMy44NDctMjUuMTIyCgkJYzMuOTg4LDguNTU1LDguMDQ0LDE2LjM0MiwxMC42NDQsMjUuMzUyYzMuMTczLTIuMzA3LDMuMDk3LTUuNjk1LDQuMzA1LTguMzQ2YzEzLjY4NC0zMC4wMzIsMjcuMzM4LTYwLjA3LDQwLjk0Ni05MC4xMjUKCQljMS44NzctNC4xMzYsNC44MjgtNi40NjUsOS40MTctNi40ODVDNzMyLjc0OCwzNTQuNjE1LDczOS4wNDIsMzU0LjYzOSw3NDYuMTQ2LDM1NC42MzkiLz4KCTxwYXRoIGNsaXAtcGF0aD0idXJsKCNTVkdJRF8yXykiIGZpbGw9IiM1ODVENTgiIGQ9Ik04MzIuNDE4LDQyMy4zMjljMC0yMS4zMTQsMC4yMTktNDIuNjM0LTAuMTUzLTYzLjkzMwoJCWMtMC4xMDQtNS44NjQsMS43MjMtNy41MjksNy4yMjktNi45NTNjNC4yNTYsMC40NDQsOC42MDcsMC4zNzgsMTIuODczLDBjNC40MS0wLjM4LDUuMTksMS40NzksNS4xODEsNS40NjgKCQljLTAuMTMyLDQzLjc2LTAuMTYyLDg3LjUxOCwwLjAxOSwxMzEuMjg0YzAuMDIxLDQuNjM4LTEuNDc3LDUuODAzLTUuNzUyLDUuNDk1Yy00LjcyMy0wLjMyOS05LjUyMS0wLjM2MS0xNC4yNDQsMC4wMTYKCQljLTQuMzEzLDAuMzM0LTUuMjc0LTEuMzEyLTUuMjQ3LTUuMzk3QzgzMi41MTMsNDY3LjMxNyw4MzIuNDE4LDQ0NS4zMiw4MzIuNDE4LDQyMy4zMjkiLz4KCTxwYXRoIGNsaXAtcGF0aD0idXJsKCNTVkdJRF8yXykiIGZpbGw9IiM1MDU1NTAiIGQ9Ik00MDcuOTczLDQyNS40MzljMCwyMC44NTEtMC4xNDMsNDEuNzEyLDAuMTA0LDYyLjU2OQoJCWMwLjA1Nyw1LjA0OC0wLjg0Niw3LjYyOS02LjU4OSw2LjkyMmMtNi4yMTgtMC43NjktMTQuMjc0LDIuNTc3LTE4LjM0MS0xLjMxMmMtNC4xMTItMy45MjYtMS4yNTctMTIuMDIyLTEuMjg0LTE4LjI2OQoJCWMtMC4xNDMtMzguMDg3LDAuMDE5LTc2LjE3Mi0wLjE3Mi0xMTQuMjUzYy0wLjAyOS00LjkxOSwxLjAyLTcuMjAxLDYuMzI0LTYuNTYxYzYuNDI4LDAuNzc2LDE0Ljc3OC0yLjgwNywxOC44NjMsMS40OTIKCQljMy43MjQsMy45MTMsMSwxMi4xMDUsMS4wNTYsMTguNDAzQzQwOC4wNTksMzkxLjQyNyw0MDcuOTczLDQwOC40MzMsNDA3Ljk3Myw0MjUuNDM5Ii8+Cgk8cGF0aCBjbGlwLXBhdGg9InVybCgjU1ZHSURfMl8pIiBmaWxsPSIjMjE4OUNBIiBkPSJNMTIzLjg1NywzNTQuNzJjNy41NjIsMCwxNC4zMDItMC4wNzEsMjEuMDQ0LDAuMDIzCgkJYzQuNzYyLDAuMDY3LDcuMjM4LDMuMDM1LDguNjI4LDcuMjc2YzUuODczLDE4LjAzNywxMS43MywzNi4wNzcsMTcuNzMsNTQuMDY2YzAuOTk5LDIuOTgxLDAuOTQyLDUuNDI0LTAuNTYyLDguMjc0CgkJYy00LjIsNy45Mi04LjA2NiwxNi4wMTQtMTIuODM4LDI1LjYwOUMxNDYuMjYyLDQxNy40ODQsMTM1LjE3OSwzODYuNDMyLDEyMy44NTcsMzU0LjcyIi8+Cgk8cGF0aCBjbGlwLXBhdGg9InVybCgjU1ZHSURfMl8pIiBmaWxsPSIjMjE4OUNBIiBkPSJNNTk1LjM5LDM1NC42NzdjOC4zNiwwLDE1Ljc4Ny0wLjAzOSwyMy4yMDYsMC4wMQoJCWM0LjE3LDAuMDI5LDYuNTU5LDIuNjA5LDguMTk3LDYuMTAyYzcuNjk2LDE2LjM3NSwxNS4yOTQsMzIuNzksMjMuMTUsNDkuMDk1YzEuMjM3LDIuNTU2LDAuNDE4LDQuMjUtMC42ODcsNi4yNTUKCQljLTQuMDU3LDcuMzEyLTguMDY0LDE0LjY0Ny0xMi44MzcsMjMuMzIyQzYyMi41MjcsNDEwLjc0Niw2MDkuMTMxLDM4My4wNzcsNTk1LjM5LDM1NC42NzciLz4KCTxwYXRoIGNsaXAtcGF0aD0idXJsKCNTVkdJRF8yXykiIGZpbGw9IiM1ODVENTgiIGQ9Ik0xMDM0LjUyNiwzMTMuMjk4Yy0wLjA4MywxMS43NzgsOC42MTksMTguNTQ3LDE5LjIwOCwxNi4yNjcKCQljMy4wNzctMC42NjgsNy43ODktMS41MTIsNy4yNjctNC42NzZjLTAuNzY0LTQuNTI3LTQuOTYyLTEuOTIzLTcuOTA2LTEuMjk3Yy0zLjc1MSwwLjc5Ni03LjMwMywwLjM3Mi05LjM5Ny0zLjI3NQoJCWMtMi4xMDQtMy42NjgtMi4yMjgtNy42NzYsMC4xMjItMTEuMjQ0YzIuMzYyLTMuNTYxLDYuMDE5LTQuMjg2LDEwLjAyLTMuMjI3YzEuMjU4LDAuMzMzLDIuNDA5LDEuMDYsMy42NTYsMS40NTEKCQljMS44NzYsMC41OTcsMi42NTgtMC45MzUsMy41NzEtMi4wODVjMS4zNDMtMS42NzgtMC4xMzQtMi4zNjYtMS4xOS0zLjAxNmMtNS42MDgtMy40MDYtMTEuNDQ2LTMuNTQ1LTE3LjI0Ni0wLjcxNgoJCUMxMDM3LjIzMiwzMDQuMTI4LDEwMzQuNjYxLDMwOC43MDUsMTAzNC41MjYsMzEzLjI5OCBNMTA3MC45OTksMzE1LjE2NGMtMC4xMjQsMTAuODA5LTkuOTUyLDE5Ljg0Ni0yMS40MTcsMTkuNjkzCgkJYy0xMS41NS0wLjE0NC0yMC45My05LjM5NS0yMC42ODQtMjAuMzg4YzAuMjQ5LTExLjE1Nyw5LjU0Mi0xOS42NTksMjEuMzctMTkuNTc0CgkJQzEwNjEuODc1LDI5NC45ODMsMTA3MS4xNSwzMDQuMDM5LDEwNzAuOTk5LDMxNS4xNjQiLz4KCTxwYXRoIGNsaXAtcGF0aD0idXJsKCNTVkdJRF8yXykiIGZpbGw9IiMyMTg5Q0EiIGQ9Ik0zOTQuMjg5LDMzNC4yODNjLTkuOTYtMC4xNjctMTguNjU0LTguMDI5LTE4LjcwMi0xNi45MTMKCQljLTAuMDQ4LTguOTY2LDkuMjg0LTE3LjM3LDE5LjE3Ny0xNy4yN2MxMC42OTQsMC4xMDYsMTkuMDgzLDguMTk0LDE4Ljc0LDE4LjA2MUM0MTMuMTksMzI3LjA3LDQwNC4zOTIsMzM0LjQ2NiwzOTQuMjg5LDMzNC4yODMiLz4KCTxwYXRoIGNsaXAtcGF0aD0idXJsKCNTVkdJRF8yXykiIGZpbGw9IiM1NTVBNTUiIGQ9Ik03NzYuOTg4LDQ5NC42MDFjLTkuNjQ2LTAuMTY3LTE3LjU3Ny04LjQyNi0xNy4yNDQtMTcuOTU0CgkJYzAuMjk1LTkuMTE1LDguNTk4LTE3LjAyNCwxNy43NzYtMTYuOTQ5YzkuMjQ3LDAuMDc2LDE3Ljc0MSw4LjYwNCwxNy43NiwxNy44NEM3OTUuMjk5LDQ4Ni42MjgsNzg2LjU2OCw0OTQuNzcyLDc3Ni45ODgsNDk0LjYwMSIKCQkvPgoJPHBhdGggY2xpcC1wYXRoPSJ1cmwoI1NWR0lEXzJfKSIgZmlsbD0iIzIxODlDQSIgZD0iTTg2Mi42ODgsMzE0LjQ1OWMwLjEwNCw5LjYxNC03Ljc3MSwxNy40OTEtMTcuNjI3LDE3LjY0CgkJYy05LjQxOCwwLjEzOS0xNy45NDktOC4xNzktMTcuOTIyLTE3LjQ3OGMwLjAyMS05LjEzOCw4LjAzNy0xNy4xMywxNy4zNjktMTcuMzE1Qzg1NC4yMjIsMjk3LjEwNCw4NjIuNTgxLDMwNC45OTEsODYyLjY4OCwzMTQuNDU5CgkJIi8+CjwvZz4KPC9zdmc+Cg=="
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;