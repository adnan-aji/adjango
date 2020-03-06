from django.shortcuts import render
from accounts.models import Student_profile
from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
from django.contrib import messages


def home(request):
    numbers = [1, 2, 3, 4, 5]
    name = "Max Goodridge"
    args = {
        'myname': name,
        'Numbers': numbers
    }
    return render(request, 'accounts/home.html', args)


def create_std(request):
    if request.POST['req'] == 'save_to':
        is_private = request.POST.get('sel_student', False)
        selectd_std = Student_profile.objects.filter(std_id=is_private)
        js=serializers.serialize('json',selectd_std)
        if request.method == "POST":
            std_id = request.POST['std_id']
            name = request.POST['name']
            gender = request.POST['Gender']
            salary = request.POST['salary']

            Student_profile.objects.create(
                std_id=std_id,
                name=name,
                Gender=gender,
                Salary=salary, )
            allstudents = Student_profile.objects.all()
            json = serializers.serialize('json', allstudents)
            print(json)
            return HttpResponse(json, content_type="application/json")
        return HttpResponse("Sorry")
    elif request.POST['req'] == 'get_from':
        allstudents = Student_profile.objects.all()
        json = serializers.serialize('json', allstudents)
        print(json)
        return HttpResponse(json, content_type="application/json")
    else:
        is_private = request.POST.get('sel_student', False)
        selectd_std = Student_profile.objects.filter(std_id=is_private)
        json = serializers.serialize('json', selectd_std)
        return HttpResponse(json, content_type="application/json")

# Create your views here.
