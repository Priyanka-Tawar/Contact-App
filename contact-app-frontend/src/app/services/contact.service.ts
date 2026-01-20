import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../config/api.config';
import { Contact, ContactRequest, PageResponse } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}

  createContact(contact: ContactRequest): Observable<Contact> {
    return this.http.post<Contact>(API_ENDPOINTS.CONTACTS, contact);
  }

  getAllContacts(page: number = 0, size: number = 10, search?: string, sortBy: string = 'createdAt'): Observable<PageResponse<Contact>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);
    
    if (search && search.trim()) {
      params = params.set('search', search.trim());
    }
    
    return this.http.get<PageResponse<Contact>>(API_ENDPOINTS.CONTACTS, { params });
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${API_ENDPOINTS.CONTACTS}/${id}`);
  }

  updateContact(id: number, contact: ContactRequest): Observable<Contact> {
    return this.http.put<Contact>(`${API_ENDPOINTS.CONTACTS}/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${API_ENDPOINTS.CONTACTS}/${id}`);
  }

  deleteAllContacts(): Observable<any> {
    return this.http.delete(API_ENDPOINTS.CONTACTS);
  }
}
