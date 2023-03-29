from jskanbanproject.models import Task, Column
Task.objects.all().delete()
Column.objects.all().delete()