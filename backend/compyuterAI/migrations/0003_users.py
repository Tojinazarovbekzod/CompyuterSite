from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('compyuterAI', '0002_brand_product_discount_price_product_is_gaming_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=120, unique=True)),
                ('last_name', models.CharField(max_length=120, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['first_name', 'last_name'],
            },
        ),
    ]