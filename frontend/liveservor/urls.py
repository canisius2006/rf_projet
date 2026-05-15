from django.urls import path 
from . import views 
urlpatterns = [
    path('',views.accueil,name='accueil'),
    path('dashboard/',views.dashboard,name='dashboard'),
    path('entree/',views.choix,name='entree'),
    path('image/',views.image,name='image'),
    path('camera/',views.camera,name='camera'),
    path('image/<str:name>',views.reconnaissance_faciale_image),
]
