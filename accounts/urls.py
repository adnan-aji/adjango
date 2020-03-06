from django.conf.urls import url
from django.conf import settings
from django.contrib.auth.views import LoginView
from accounts.views import create_std, home
from django.conf.urls.static import static
from django.contrib.auth import login

urlpatterns = [
                  url(r'^$', home),
                  url(r'^login/$', LoginView.as_view(template_name='accounts/login.html'), name="login"),
                  url(r'^ $', LoginView.as_view(template_name='accounts/logout.html'), name="logout"),
                  url(r'^std_reg$', LoginView.as_view(template_name='accounts/student_register.html'), name="Register"),
                  url(r'^home/$', LoginView.as_view(template_name='accounts/home.html'), name="Home"),
                  url(r'^datatable/$', LoginView.as_view(template_name='accounts/Datatable.html'), name="Datatable"),
                  url(r'student/create/', create_std,name="std_create"),
              ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
