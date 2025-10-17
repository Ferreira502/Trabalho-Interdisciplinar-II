package com.example.MAIN;

import static spark.Spark.*;
import com.example.DAO.Dao;
import com.example.CUIDADOR.Cuidador;
import com.example.PACIENTE.Paciente;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Dao dao = new Dao();
        Gson gson = new Gson();

        port(4567);

        before((req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        });

        options("/*", (req, res) -> "OK");

        get("/paciente/email/:email", (req, res) -> {
            res.type("application/json");
            try {
                String email = req.params(":email");
                Paciente paciente = dao.getPacientePorEmail(email);
                if (paciente != null) {
                    paciente.setSenha(null);
                    return gson.toJson(Map.of("status", "ok", "paciente", paciente));
                } else {
                    res.status(404);
                    return gson.toJson(Map.of("erro", "Paciente não encontrado"));
                }
            } catch (Exception e) {
                res.status(500);
                return gson.toJson(Map.of("erro", e.getMessage()));
            }
        });

        post("/paciente", (req, res) -> {
            res.type("application/json");
            try {
                Type mapType = new TypeToken<Map<String, String>>() {}.getType();
                Map<String, String> data = gson.fromJson(req.body(), mapType);

                int id = dao.cadastrarPaciente(
                        data.get("nome"),
                        data.get("email"),
                        data.get("telefone"),
                        data.get("dataNascimento"),
                        data.get("historicoMedico"),
                        data.get("senha")
                );

                return gson.toJson(Map.of("pacienteId", id));
            } catch (Exception e) {
                res.status(500);
                return gson.toJson(Map.of("erro", e.getMessage()));
            }
        });

        post("/cuidador", (req, res) -> {
            res.type("application/json");
            try {
                Type mapType = new TypeToken<Map<String, String>>() {}.getType();
                Map<String, String> data = gson.fromJson(req.body(), mapType);

                int id = dao.cadastrarCuidador(
                        data.get("nome"),
                        data.get("email"),
                        data.get("telefone"),
                        data.get("dataNascimento"),
                        data.get("especialidade"),
                        data.get("senha")
                );

                return gson.toJson(Map.of("cuidadorId", id));
            } catch (Exception e) {
                res.status(500);
                return gson.toJson(Map.of("erro", e.getMessage()));
            }
        });

        delete("/cuidador/:id", (req, res) -> {
            res.type("application/json");
            try {
                int id = Integer.parseInt(req.params(":id"));
                return gson.toJson(Map.of("mensagem", "Cuidador removido"));
            } catch (Exception e) {
                res.status(500);
                return gson.toJson(Map.of("erro", e.getMessage()));
            }
        });

        put("/cuidador/:id", (req, res) -> {
            res.type("application/json");
            try {
                int id = Integer.parseInt(req.params(":id"));
                Type mapType = new TypeToken<Map<String, String>>() {}.getType();
                Map<String, String> data = gson.fromJson(req.body(), mapType);

                return gson.toJson(Map.of("mensagem", "Cuidador editado"));
            } catch (Exception e) {
                res.status(500);
                return gson.toJson(Map.of("erro", e.getMessage()));
            }
        });

        post("/login/paciente", (req, res) -> {
            res.type("application/json");
            try {
                Type mapType = new TypeToken<Map<String, String>>() {}.getType();
                Map<String, String> data = gson.fromJson(req.body(), mapType);

                String email = data.get("email");
                String senha = data.get("senha");

                Paciente paciente = dao.loginPaciente(email, senha);

                if (paciente != null) {
                    paciente.setSenha(null);
                    return gson.toJson(Map.of("status", "ok", "paciente", paciente));
                } else {
                    res.status(401);
                    return gson.toJson(Map.of("erro", "Email ou senha incorretos"));
                }
            } catch (Exception e) {
                res.status(500);
                return gson.toJson(Map.of("erro", e.getMessage()));
            }
        });

        post("/login/cuidador", (req, res) -> {
            res.type("application/json");
            try {
                Type mapType = new TypeToken<Map<String, String>>() {}.getType();
                Map<String, String> data = gson.fromJson(req.body(), mapType);

                String email = data.get("email");
                String senha = data.get("senha");

                Cuidador cuidador = dao.loginCuidador(email, senha);

                if (cuidador != null) {
                    cuidador.setSenha(null);
                    return gson.toJson(Map.of("status", "ok", "cuidador", cuidador));
                } else {
                    res.status(401);
                    return gson.toJson(Map.of("erro", "Email ou senha incorretos"));
                }
            } catch (Exception e) {
                res.status(500);
                return gson.toJson(Map.of("erro", e.getMessage()));
            }
        });

        get("/cuidador/:id", (req, res) -> {
            res.type("application/json");
            try {
                int id = Integer.parseInt(req.params(":id"));
                Cuidador cuidador = dao.getCuidadorPorId(id);
                if (cuidador != null) {
                    cuidador.setSenha(null);
                    return gson.toJson(Map.of("status", "ok", "cuidador", cuidador));
                } else {
                    res.status(404);
                    return gson.toJson(Map.of("erro", "Cuidador não encontrado"));
                }
            } catch (NumberFormatException nfe) {
                res.status(400);
                return gson.toJson(Map.of("erro", "ID inválido"));
            } catch (Exception e) {
                res.status(500);
                return gson.toJson(Map.of("erro", e.getMessage()));
            }
        });

        get("/cuidador/email/:email", (req, res) -> {
            res.type("application/json");
            try {
                String email = req.params(":email");
                Cuidador cuidador = dao.getCuidadorPorEmail(email);
                if (cuidador != null) {
                    cuidador.setSenha(null);
                    return gson.toJson(Map.of("status", "ok", "cuidador", cuidador));
                } else {
                    res.status(404);
                    return gson.toJson(Map.of("erro", "Cuidador não encontrado"));
                }
            } catch (Exception e) {
                res.status(500);
                return gson.toJson(Map.of("erro", e.getMessage()));
            }
        });
    }
}
