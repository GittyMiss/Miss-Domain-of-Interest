import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NoteService } from '@/services/NoteService';
import { ThemeService } from '@/services/ThemeService';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [recentNotes, setRecentNotes] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const stats = await NoteService.getStats();
      const allNotes = await NoteService.getAllNotes();
      
      // Get 3 most recent notes
      const recent = allNotes
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 3);
      
      setStats(stats);
      setRecentNotes(recent);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#4ECDC4" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bienvenue!</Text>
          <Text style={styles.subGreeting}>Votre espace d'apprentissage personnel</Text>
        </View>
        <MaterialCommunityIcons name="book-open-variant" size={40} color="#4ECDC4" />
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Vos Statistiques</Text>
        
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#FFE5E5' }]}>
            <Text style={styles.statValue}>{stats?.total || 0}</Text>
            <Text style={styles.statLabel}>Notes Totales</Text>
            <MaterialCommunityIcons name="file-document" size={24} color="#FF6B6B" />
          </View>

          <View style={[styles.statCard, { backgroundColor: '#E5F3FF' }]}>
            <Text style={styles.statValue}>{stats?.learning || 0}</Text>
            <Text style={styles.statLabel}>Apprentissage</Text>
            <MaterialCommunityIcons name="school" size={24} color="#45B7D1" />
          </View>

          <View style={[styles.statCard, { backgroundColor: '#F0E5FF' }]}>
            <Text style={styles.statValue}>{stats?.favorites || 0}</Text>
            <Text style={styles.statLabel}>Favoris</Text>
            <MaterialCommunityIcons name="heart" size={24} color="#9B59B6" />
          </View>

          <View style={[styles.statCard, { backgroundColor: '#E5FFE5' }]}>
            <Text style={styles.statValue}>{stats?.essay || 0}</Text>
            <Text style={styles.statLabel}>Essais</Text>
            <MaterialCommunityIcons name="pencil" size={24} color="#52C41A" />
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Actions Rapides</Text>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('NotesStack', { screen: 'CreateNote' })}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Créer une Note</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#9B59B6' }]}
          onPress={() => navigation.navigate('ReviewStack', { screen: 'ReviewMain' })}
        >
          <MaterialCommunityIcons name="refresh" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Commencer la Révision</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#FFA502' }]}
          onPress={() => navigation.navigate('ThemesStack', { screen: 'ThemesList' })}
        >
          <MaterialCommunityIcons name="palette" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Gérer les Thèmes</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Notes */}
      {recentNotes.length > 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Notes Récentes</Text>
          
          {recentNotes.map((note, index) => (
            <TouchableOpacity
              key={note.id}
              style={styles.noteCard}
              onPress={() => navigation.navigate('NotesStack', { 
                screen: 'NoteDetail', 
                params: { noteId: note.id } 
              })}
            >
              <View style={styles.noteCardContent}>
                <Text style={styles.noteTitle} numberOfLines={1}>
                  {note.title}
                </Text>
                <Text style={styles.notePreview} numberOfLines={2}>
                  {note.content}
                </Text>
                <View style={styles.noteFooter}>
                  <Text style={styles.noteType}>{note.type}</Text>
                  <Text style={styles.noteDate}>
                    {new Date(note.updatedAt).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons 
                name={note.isFavorite ? 'heart' : 'heart-outline'} 
                size={20} 
                color={note.isFavorite ? '#FF6B6B' : '#ccc'} 
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Empty State */}
      {!loading && stats?.total === 0 && (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="inbox" size={60} color="#ccc" />
          <Text style={styles.emptyStateText}>Aucune note pour le moment</Text>
          <Text style={styles.emptyStateSubtext}>
            Créez votre première note pour commencer
          </Text>
        </View>
      )}

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
  },
  statsSection: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  actionsSection: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#4ECDC4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    flex: 1,
  },
  recentSection: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  noteCardContent: {
    flex: 1,
    marginRight: 10,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  notePreview: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteType: {
    fontSize: 11,
    backgroundColor: '#E5F3FF',
    color: '#45B7D1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontWeight: '600',
  },
  noteDate: {
    fontSize: 11,
    color: '#999',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginTop: 15,
  },
  emptyStateSubtext: {
    fontSize: 13,
    color: '#bbb',
    marginTop: 5,
  },
  spacer: {
    height: 20,
  },
});
