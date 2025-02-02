# Generated by Django 5.0.2 on 2024-05-16 07:18

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bidwin", "0016_userprofile_is_premium"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Account",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("account_number", models.CharField(max_length=20)),
                ("balance", models.DecimalField(decimal_places=2, max_digits=10)),
                (
                    "Reference_Number",
                    models.CharField(
                        blank=True,
                        default="frfrd2bmpt",
                        editable=False,
                        max_length=10,
                        unique=True,
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="accounts",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
