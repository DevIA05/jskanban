from rest_framework import serializers
from jskanbanproject.models import Task, Column

class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = ('__all__') #("title", "id", "position")

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('__all__') #('title', 'id', 'idcol', 'position')