# Generated by Django 5.0.2 on 2024-03-15 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bidwin", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="phone",
            field=models.CharField(default="Non", max_length=13),
        ),
    ]
