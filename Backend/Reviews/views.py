from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from allauth.socialaccount.models import SocialToken
import requests

# Mock reviews data
get_reviews = {
    "reviews": [
        {
            "reviewId": "001",
            "reviewer": {
                "displayName": "Alice Walker",
                "profilePhotoUrl": "https://example.com/photo1.jpg",
                "isAnonymous": False
            },
            "comment": "Excellent quality and quick service. Will return soon.",
            "starRating": "FIVE",
            "creatTime": "2024-12-20T10:00:00Z",
            "updateTime": "2024-12-20T12:00:00Z",
            "reviewReply": {
                "message": "Thank you, Alice! We're excited to serve you again.",
                "updateTime": "2024-12-20T14:00:00Z"
            }
        },
        {
            "reviewId": "002",
            "reviewer": {
                "displayName": "Bob Johnson",
                "profilePhotoUrl": "https://example.com/photo2.jpg",
                "isAnonymous": False
            },
            "comment": "The wait time was too long, though the food was good.",
            "starRating": "THREE",
            "creatTime": "2024-12-19T09:00:00Z",
            "updateTime": "2024-12-19T09:30:00Z",
            "reviewReply": {
                "message": "Thanks for the feedback, Bob. We're working to improve!",
                "updateTime": "2024-12-19T10:00:00Z"
            }
        },
        {
            "reviewId": "003",
            "reviewer": {
                "displayName": "isAnonymous",
                "profilePhotoUrl": "",
                "isAnonymous": True
            },
            "comment": "Great ambiance and reasonable prices.",
            "starRating": "FOUR",
            "creatTime": "2024-12-18T08:00:00Z",
            "updateTime": "2024-12-18T08:00:00Z",
            "reviewReply": None
        },
        {
            "reviewId": "004",
            "reviewer": {
                "displayName": "Charlie Davis",
                "profilePhotoUrl": "https://example.com/photo3.jpg",
                "isAnonymous": False
            },
            "comment": "The staff was incredibly polite, and the desserts were amazing.",
            "starRating": "FIVE",
            "creatTime": "2024-12-17T19:00:00Z",
            "updateTime": "2024-12-17T19:30:00Z",
            "reviewReply": {
                "message": "Thank you, Charlie! Your kind words mean the world to us.",
                "updateTime": "2024-12-17T20:00:00Z"
            }
        }
    ]
}

# API to fetch mock reviews
@api_view(['GET'])
def retrieve_reviews(request):
    return JsonResponse(get_reviews, safe=False)

# Utility function to get user's Google access token
def obtain_google_token(user):
    token_obj = SocialToken.objects.filter(account__user=user, account__provider='google').first()
    return token_obj.token if token_obj else None

# Fetch reviews from Google My Business
def google_reviews(token):
    headers = {'Authorization': f'Bearer {token}'}
    
    # Step 1: Get account information
    account_url = "https://mybusiness.googleapis.com/v1/accounts"
    account_response = requests.get(account_url, headers=headers)
    account_data = account_response.json()
    account_id = account_data['accounts'][0]['name'].split('/')[-1]

    # Step 2: Get location data and reviews
    locations_url = f"https://mybusiness.googleapis.com/v1/accounts/{account_id}/locations"
    locations_response = requests.get(locations_url, headers=headers)
    locations = locations_response.json().get('locations', [])
    reviews_list = []

    for location in locations:
        loc_id = location['name'].split('/')[-1]
        reviews_url = f"https://mybusiness.googleapis.com/v1/accounts/{account_id}/locations/{loc_id}/reviews"
        response = requests.get(reviews_url, headers=headers)
        reviews_list.extend(response.json().get('reviews', []))
    
    return reviews_list

# View to fetch Google reviews
@login_required
def display_reviews(request):
    token = obtain_google_token(request.user)
    if token:
        user_reviews = google_reviews(token)
        return render(request, 'review_display.html', {'reviews': user_reviews})
    else:
        return render(request, 'error_display.html', {'error_message': "Failed to retrieve reviews. Please check your account."})
      
