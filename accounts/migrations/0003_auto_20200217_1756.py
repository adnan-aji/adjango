# Generated by Django 3.0.2 on 2020-02-17 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_student_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student_profile',
            name='std_id',
            field=models.IntegerField(primary_key='true', serialize=False),
        ),
    ]
