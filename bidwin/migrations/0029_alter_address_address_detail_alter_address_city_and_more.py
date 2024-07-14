# Generated by Django 5.0.2 on 2024-05-18 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bidwin", "0028_userprofile_address_available"),
    ]

    operations = [
        migrations.AlterField(
            model_name="address",
            name="address_detail",
            field=models.CharField(max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name="address",
            name="city",
            field=models.CharField(max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name="address",
            name="floor",
            field=models.CharField(max_length=2, null=True),
        ),
        migrations.AlterField(
            model_name="address",
            name="land_line_phone",
            field=models.CharField(max_length=12, null=True),
        ),
        migrations.AlterField(
            model_name="address",
            name="plaque",
            field=models.CharField(max_length=5, null=True),
        ),
        migrations.AlterField(
            model_name="address",
            name="postal_code",
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name="address",
            name="state",
            field=models.CharField(max_length=300, null=True),
        ),
    ]
