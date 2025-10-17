#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <PulseSensorPlayground.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <TimeLib.h>

// Configurações de Wi-Fi
const char *WIFI_SSID = "PUCminas";
const char *WIFI_PASSWORD = "kaka123456";
const char *URL = ""; // Endereço do servidor

// Sensor de pulso
const int PulseWire = A0; // CORRIGIDO: Pino analógico do ESP8266 é o A0
const int LED = LED_BUILTIN; // LED integrado (geralmente GPIO2 no NodeMCU)
int Threshold = 550; // Limite para detectar batimento

WiFiClient client;
HTTPClient httpClient;

PulseSensorPlayground pulseSensor; // Cria o objeto pulseSensor

WiFiUDP udp;
// Fuso horário de Brasília (UTC-3), -10800 segundos
NTPClient timeClient(udp, "pool.ntp.org", -10800, 60000);

unsigned long lastTime = 0;
unsigned long delayTime = 1000; // Intervalo para verificar batimento

void setup() {
  Serial.begin(115200); // Para monitor serial
  Serial.println("\nIniciando...");

  // Conectar-se ao Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando ao Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConectado à rede Wi-Fi!");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());

  // Iniciar o cliente NTP
  timeClient.begin();

  // Configurar o PulseSensor
  pulseSensor.analogInput(PulseWire);
  pulseSensor.blinkOnPulse(LED); // Piscar o LED integrado com o batimento
  pulseSensor.setThreshold(Threshold);

  if (pulseSensor.begin()) {
    Serial.println("PulseSensor iniciado!");
  } else {
    Serial.println("Erro ao iniciar o PulseSensor.");
  }
}

void loop() {
  // A biblioteca PulseSensor precisa ser chamada constantemente para funcionar
  if (pulseSensor.sawStartOfBeat()) {
    // Só entra aqui no momento exato em que um novo batimento é detectado
    int myBPM = pulseSensor.getBeatsPerMinute();
    
    // Verifica se a leitura de BPM é válida antes de enviar
    if (myBPM > 0) {
      Serial.println("♥ Batimento detectado!");
      Serial.print("BPM: ");
      Serial.println(myBPM);

      // Atualiza o tempo via NTP (só quando for enviar dados)
      if (timeClient.update()) {
        // Define o tempo atual no formato TimeLib
        setTime(timeClient.getEpochTime());

        // Obtém a hora e data atuais usando TimeLib
        String horaStr = String(hour()) + ":" + String(minute()) + ":" + String(second());
        
        int diaAtual = day();
        int mesAtual = month();
        int anoAtual = year();

        // Formata a data no formato DD/MM/AAAA
        String dataStr = (diaAtual < 10 ? "0" : "") + String(diaAtual) + "/" + 
                         (mesAtual < 10 ? "0" : "") + String(mesAtual) + "/" + 
                         String(anoAtual);

        // Monta o JSON
        String json = "{\"id\": \"607\", \"bpm\": \"" + String(myBPM) + "\", \"data\": \"" + dataStr + "\", \"hora\": \"" + horaStr + "\"}";
        Serial.println("Enviando JSON: " + json);

        // Envia os dados para o servidor via HTTP POST
        httpClient.begin(client, URL);
        httpClient.addHeader("Content-Type", "application/json");
        httpClient.setTimeout(5000);

        int httpResponseCode = httpClient.POST(json);

        if (httpResponseCode > 0) {
          String content = httpClient.getString();
          Serial.println("Resposta do servidor: " + content);
        } else {
          Serial.print("Erro ao enviar dados. Código de erro HTTP: ");
          Serial.println(httpResponseCode);
        }

        // Finaliza a requisição HTTP
        httpClient.end();

      } else {
        Serial.println("Falha ao atualizar a hora via NTP.");
      }
    }
  }

  // Pequeno delay para não sobrecarregar o processador
  delay(20);
}