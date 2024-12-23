from django.urls import path
from .views import retrieve_reviews

urlpatterns = [
  # path("login/",views.login),
  # path("logout/",views.logout),
  path("reviews/", retrieve_reviews),
]
