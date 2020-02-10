from django.shortcuts import render


def home(request):
    numbers = [1, 2, 3, 4, 5]
    name = "Max Goodridge"
    args = {
        'myname': name,
        'Numbers': numbers
    }
    return render(request, 'accounts/home.html',args)

# Create your views here.
