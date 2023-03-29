from api.serializers import ColumnSerializer
from jskanbanproject.models import Task, Column 

from rest_framework.response import Response
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
def getDataFromDB(request):
    # je récupère les données
    data = Column.objects.all()
    serializer = ColumnSerializer(data, many=True)
    return Response(serializer.data)
