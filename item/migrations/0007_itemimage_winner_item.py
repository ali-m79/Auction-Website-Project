# Generated by Django 5.0.2 on 2024-05-07 10:02

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bidwin", "0011_user_address"),
        ("item", "0006_rename_owner_id_participate_owner"),
    ]

    operations = [
        migrations.CreateModel(
            name="ItemImage",
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
                ("image", models.ImageField(upload_to="item_images/")),
                (
                    "item",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="images",
                        to="item.item",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Winner_item",
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
                ("win_date", models.DateTimeField(default=django.utils.timezone.now)),
                (
                    "item",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="winner",
                        to="item.item",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="won_items",
                        to="bidwin.user",
                    ),
                ),
            ],
        ),
    ]
