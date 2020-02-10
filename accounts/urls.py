from django.conf.urls import url
from django.conf import settings
from . import views
from django.contrib.auth.views import LoginView

from django.conf.urls.static import static
from django.contrib.auth import login
urlpatterns = [
    url(r'^$', views.home),
    url(r'^login/$', LoginView.as_view(template_name='accounts/login.html'), name="login"),
    url(r'^home/$', LoginView.as_view(template_name='accounts/home.html'), name="Home"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
