from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.getDataFromDB, name="gddb")
    

]