package com.example.PACIENTE;

public class Paciente {
    private String nome;
    private String email;
    private String telefone;
    private String dataNascimento;
    private String historicoMedico;
    private String senha;

    // ================== CONSTRUTORES ==================

    // Construtor vazio
    public Paciente() {
    }

    // Construtor completo
    public Paciente(String nome, String email, String telefone,
                    String dataNascimento, String historicoMedico, String senha) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
        this.historicoMedico = historicoMedico;
        this.senha = senha;
    }

    // ================== GETTERS E SETTERS ==================
    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return this.telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getDataNascimento() {
        return this.dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getHistoricoMedico() {
        return this.historicoMedico;
    }

    public void setHistoricoMedico(String historicoMedico) {
        this.historicoMedico = historicoMedico;
    }

    public String getSenha() {
        return this.senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    @Override
    public String toString() {
        return "Paciente {" +
               "nome='" + nome + '\'' +
               ", email='" + email + '\'' +
               ", telefone='" + telefone + '\'' +
               ", dataNascimento='" + dataNascimento + '\'' +
               ", historicoMedico='" + historicoMedico + '\'' +
               '}';
    }
}