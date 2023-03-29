from django.db import models

class Column(models.Model):
    title = models.CharField(max_length=255)
    id = models.AutoField(primary_key=True)
    position = models.IntegerField()

    class Meta:
        db_table = 'column'

class Task(models.Model):
    title = models.CharField(max_length=255)
    id = models.AutoField(primary_key=True)
    idcol = models.ForeignKey(Column, on_delete=models.CASCADE)
    position = models.IntegerField()

    class Meta:
        db_table = 'task'
