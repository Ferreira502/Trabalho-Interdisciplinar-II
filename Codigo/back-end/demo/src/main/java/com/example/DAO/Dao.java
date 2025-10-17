package com.example.DAO;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.example.CUIDADOR.Cuidador;
import com.example.PACIENTE.Paciente;

public class Dao 
{
    private static String user = "postgres";
    private static String password = "988739002Gc.";
    private static String url = "jdbc:postgresql://localhost:5432/pessoas";

    public Connection connect() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

    public int cadastrarPaciente(String nome, String email, String telefone,
                                 String dataNascimento,
                                 String historicoMedico, String senha) throws SQLException {
        String sql = "INSERT INTO paciente (nome, email, telefone, data_nascimento, historico_medico, senha) " +
                     "VALUES (?, ?, ?, ?, ?, ?) RETURNING id";

        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, nome);
            ps.setString(2, email);
            ps.setString(3, telefone);
            ps.setString(4, dataNascimento);
            ps.setString(5, historicoMedico);
            ps.setString(6, senha);

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt("id");
            } else {
                return -1;
            }
        }
    }

    public Paciente getPacientePorId(int id) throws SQLException {
        String sql = "SELECT * FROM paciente WHERE id = ?";
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return new Paciente(
                    rs.getString("nome"),
                    rs.getString("email"),
                    rs.getString("telefone"),
                    rs.getString("data_nascimento"),
                    rs.getString("historico_medico"),
                    rs.getString("senha")
                );
            }
        }
        return null;
    }

    public Paciente getPacientePorEmail(String email) throws SQLException {
        String sql = "SELECT * FROM paciente WHERE email = ?";
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return new Paciente(
                    rs.getString("nome"),
                    rs.getString("email"),
                    rs.getString("telefone"),
                    rs.getString("data_nascimento"),
                    rs.getString("historico_medico"),
                    rs.getString("senha")
                );
            }
        }
        return null;
    }

    public List<Paciente> getTodosPacientes() throws SQLException {
        List<Paciente> lista = new ArrayList<>();
        String sql = "SELECT * FROM paciente ORDER BY id";

        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Paciente p = new Paciente(
                    rs.getString("nome"),
                    rs.getString("email"),
                    rs.getString("telefone"),
                    rs.getString("data_nascimento"),
                    rs.getString("historico_medico"),
                    rs.getString("senha")
                );
                lista.add(p);
            }
        }
        return lista;
    }

    public int cadastrarCuidador(String nome, String email, String telefone,
                                 String dataNascimento,
                                 String especialidade, String senha) throws SQLException {
        String sql = "INSERT INTO cuidador (nome, email, telefone, data_nascimento, especialidade, senha) " +
                     "VALUES (?, ?, ?, ?, ?, ?) RETURNING id";

        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, nome);
            ps.setString(2, email);
            ps.setString(3, telefone);
            ps.setString(4, dataNascimento);
            ps.setString(5, especialidade);
            ps.setString(6, senha);

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt("id");
            } else {
                return -1;
            }
        }
    }

    public Cuidador getCuidadorPorId(int id) throws SQLException {
        String sql = "SELECT * FROM cuidador WHERE id = ?";
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return new Cuidador(
                    rs.getString("nome"),
                    rs.getString("email"),
                    rs.getString("telefone"),
                    rs.getString("data_nascimento"),
                    rs.getString("especialidade"),
                    rs.getString("senha")
                );
            }
        }
        return null;
    }

    public Cuidador getCuidadorPorEmail(String email) throws SQLException {
        String sql = "SELECT * FROM cuidador WHERE email = ?";
        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return new Cuidador(
                    rs.getString("nome"),
                    rs.getString("email"),
                    rs.getString("telefone"),
                    rs.getString("data_nascimento"), 
                    rs.getString("especialidade"),
                    rs.getString("senha")
                );
            }
        }
        return null;
    }

    public List<Cuidador> getTodosCuidadores() throws SQLException {
        List<Cuidador> lista = new ArrayList<>();
        String sql = "SELECT * FROM cuidador ORDER BY id";

        try (Connection conn = connect();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Cuidador c = new Cuidador(
                    rs.getString("nome"),
                    rs.getString("email"),
                    rs.getString("telefone"),
                    rs.getString("data_nascimento"),
                    rs.getString("especialidade"),
                    rs.getString("senha")
                );
                lista.add(c);
            }
        }
        return lista;
    }
    
    public Paciente loginPaciente(String email, String senha) throws SQLException {
        String sql = "SELECT * FROM paciente WHERE email = ? AND senha = ?";
        try (Connection conn = connect();
            PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, email);
            ps.setString(2, senha);

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return new Paciente(
                    rs.getString("nome"),
                    rs.getString("email"),
                    rs.getString("telefone"),
                    rs.getString("data_nascimento"),
                    rs.getString("historico_medico"),
                    rs.getString("senha")
                );
            }
        }
        return null;
    }

    public Cuidador loginCuidador(String email, String senha) throws SQLException {
        String sql = "SELECT * FROM cuidador WHERE email = ? AND senha = ?";
        try (Connection conn = connect();
            PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, email);
            ps.setString(2, senha);

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return new Cuidador(
                    rs.getString("nome"),
                    rs.getString("email"),
                    rs.getString("telefone"),
                    rs.getString("data_nascimento"),
                    rs.getString("especialidade"),
                    rs.getString("senha")
                );
            }
        }
        return null;
    }

}
