from django.shortcuts import render
from jskanbanproject.models import Task, Column
import pdb; #pdb.set_trace()
from django.db.models import Max


def index(request):
    data, max_id, max_idBoard = getDataFromDB()
    return render(request, "index.html", context = {'data': data, "max_id": max_id, "max_idBoard": max_idBoard})

#** Send tasks grouped by column
#*  by sorting columns and tasks according to their position
#* return list[dict[dict]] ([column[task]])
def getDataFromDB():
    
    # retrieve all columns
    columns = Column.objects.all().order_by('position')
    max_id = Task.objects.aggregate(Max('id'))['id__max']
    max_idBoard = Column.objects.aggregate(Max('id'))['id__max']

    # create a list to store the results
    result_list = []

    # loop through the columns and retrieve their tasks
    for column in columns:
        tasks = Task.objects.filter(idcol=column).order_by('position')

        # create a dictionary to store the column and its tasks
        column_dict = {}
        column_dict['id'] = str(column.id)
        column_dict['title'] = column.title
        column_dict['item'] = []

        # loop through the tasks and add them to the dictionary
        for task in tasks:
            task_dict = {}
            task_dict['id'] = task.id
            task_dict['title'] = task.title
            task_dict['position'] = task.position
            column_dict['item'].append(task_dict)

        # add the column dictionary to the result list
        result_list.append(column_dict)

    # print the result list
    return result_list, max_id, max_idBoard


