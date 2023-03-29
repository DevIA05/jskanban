from jskanbanproject.models import Task, Column
import os
import random


print("working dir: " + os.getcwd())

pos = 0
for col in range(1, 4):
    Column.objects.create(title = "board"+str(col), position = col)
    nombre = random.randint(1, 4)
    print("nbTask: " + str(nombre))
    for i in range(1, nombre+1):
        Task.objects.create(title = "task"+str(i), position = pos+1, idcol = Column.objects.get(title="board"+str(col)))
        pos = pos+1
        

    
