from django.shortcuts import render
from django.http import HttpRequest,HttpResponse,JsonResponse
import json 
import numpy as np
import cv2 
from . import reconnaissance_par_embeddings as rpe
import time 
# Create your views here.

def accueil(request):
    return render(request,'accueil.html') 

def choix(request):
    """Cette vue va nous permettre de faire le choix entre une image
    et un flux video"""
    return render(request,'choix.html')

def dashboard(request):
    """la vue des caméras """
    return render(request,'board.html')


def image(request):
    """Pour pouvoir utiliser une image pour la détection """
    return render(request,'image.html')

def reconnaissance_faciale_image(request:HttpRequest,name):
    """Pour pouvoir faire la reconnaissance pour l'image envoyé"""
    if request.method=='POST' :
        # 1. Récupérer le fichier depuis la requête
        image_file = request.FILES.get('image')
        t = time.time()
        data = rpe.identifier_serveur_image(image_file)
        fin = time.time() -t
        print(data)
        #On retourne la réponse sous forme  de json
        return JsonResponse({'name':name,'infos':data,'temps':fin})


def camera(request):
    """Pour pouvoir visualiser la reconnaissance de face avec la camera frontale"""
    return render(request,'camera.html')
