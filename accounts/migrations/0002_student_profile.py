# Generated by Django 3.0.2 on 2020-02-17 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student_profile',
            fields=[
                ('std_id', models.IntegerField(primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('Gender', models.CharField(max_length=10)),
                ('Salary', models.IntegerField()),
            ],
        ),
    ]
