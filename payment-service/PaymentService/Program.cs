using Stripe;

var builder = WebApplication.CreateBuilder(args);

// Configuração do Stripe
StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];

// Serviços
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");
app.MapControllers();

app.Run();